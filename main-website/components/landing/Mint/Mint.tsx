import Layout from "../Layout/Layout";
import {Box, Divider, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import React, {MouseEvent, useCallback, useEffect, useState} from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUserData, decodeMintData, getMintData, getUserData, MintData, mintOne, MINT_CONFIG_ADDRESS } from "../../../lib/mint-instructions";
import {useCookies} from "../../../hooks/useCookies";

const airdropAuthority = Keypair.fromSecretKey(new Uint8Array([87, 63, 47, 245, 211, 198, 55, 243, 138, 201, 237, 198, 57, 34, 88, 224, 234, 49, 51, 191, 224, 89, 45, 31, 199, 95, 209, 129, 178, 203, 158, 88, 135, 41, 24, 119, 139, 239, 142, 50, 14, 223, 31, 244, 177, 196, 221, 109, 149, 38, 54, 24, 206, 7, 176, 72, 52, 175, 40, 209, 211, 239, 86, 51]))

const MainText = ({marginBottom}) => {
    return <Box marginBottom={marginBottom} fontFamily="Njord" fontWeight="400">
        <Text fontSize="61px" color="#E8E8E8" lineHeight="58px">Card&apos;s mint</Text>
        <Text fontSize="100px" color="#71CFC3" lineHeight="95px">now Live!</Text>
    </Box>
}

const ProgressBar = () => {

    const { connection } = useConnection();
    const [mintState, setMintState] = useState<MintData | undefined>();

    useEffect(() => {

        const load = async () => {
            const accountData = await getMintData(connection);
            const state = decodeMintData(accountData);
            setMintState(state);
        };

        connection.onAccountChange(MINT_CONFIG_ADDRESS, (accountInfo, _) => {

            const state = decodeMintData(accountInfo.data);
            setMintState(state);
        });

        load();
    },
        [])

    return <Box w="100%" h="64px" color="#20202080">

    </Box>
}

export const Mint = () => {
    const size = useWindowSize();

    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;
    const wallet = useWallet();
    const { connection } = useConnection();
    const {verify} = useCookies();

    async function mintClick(e: MouseEvent<HTMLDivElement>) {

        if (!wallet.publicKey) {
            return;
        }

        const userData = await getUserData(wallet.publicKey, connection);
        const tx = new Transaction();
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        if (!userData) {
            tx.add(await createUserData(wallet.publicKey));
        }

        const mint = new Keypair();
        tx.add(await mintOne(wallet.publicKey, mint));

        tx.partialSign(mint, airdropAuthority);
        let signedTransaction: Transaction | null = undefined;

        try {
            signedTransaction = await wallet.signTransaction(tx);
        }
        catch (e) {
            return;
        }

        try {
            const result = await connection.sendRawTransaction(signedTransaction.serialize());
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (size.width !== undefined && !verify)
            window.location.replace('/');
    }, [size.width]);

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                <Box onClick={mintClick} w="300px" h="72px" backgroundColor="#202020" color="#71CFC3" border="2px" borderColor="#71CFC3"
                    borderRadius="20px" cursor="pointer"
                    fontWeight="400" fontSize="36px" lineHeight="68px" textAlign="center" transition="all 1s" _hover={{
                        backgroundColor: "#71CFC3",
                        color: "#202020",
                    }}>Mint</Box>
            </Flex>
            // <Box mt="80px" mb="232px" pl="96px" pr="96px">
            //     <HStack>
            //         <VStack maxW="612px" spacing="0px">
            //             <MainText marginBottom="56px"/>
            //             <Divider mb="51px" borderColor="#E8E8E8BF"/>
            //         </VStack>
            //     </HStack>
            // </Box>
        }
    </Layout>
}
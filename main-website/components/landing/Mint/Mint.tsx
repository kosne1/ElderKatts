import Layout from "../Layout/Layout";
import {
    Box,
    Center,
    Flex, HStack,
    Img,
    Stack,
    Text, useBoolean, useToast,
    VStack
} from "@chakra-ui/react";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { Connection, Keypair, SystemInstruction, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    createUserData,
    decodeMintData,
    getMintData,
    getUserData,
    MintData,
    mintOne,
    MINT_CONFIG_ADDRESS,
    getAuthorityMintSig,
    getWalletStatus, getMintStatus, WhitelistStatus, MINT_AIRDROP_AUTHORITY, UserStageInfo, MINT_ADMIN_ACCOUNT
} from "../../../lib/mint-instructions";
import styles from "../../../styles/mint.module.scss"
import { getCards } from "../../../lib/whitelist-utils";
import { confirmMint, waitForConfirmation } from "../../../lib/mint-util";

const MainText = ({ marginBottom }) => {
    const size = useWindowSize();
    return <Box marginBottom={marginBottom} w="100%" fontFamily="Njord" fontWeight="400" textAlign={size.width < 500 ? "center" : "left"}>
        <Text fontSize={size.width < 500 ? "40px" : "61px"} color="#E8E8E8" lineHeight={size.width < 500 ? "39px" : "58px"}>Card&apos;s mint</Text>
        <Text fontSize={size.width < 500 ? "64px" : "100px"} color="#71CFC3" lineHeight={size.width < 500 ? "60px" : "95px"}>now Live!</Text>
    </Box>
}

const ProgressPanel = () => {
    const { connection } = useConnection();
    const [mintState, setMintState] = useState<MintData | undefined>();
    const srcWidth = 22;

    const loadedBarRef = useRef(null);
    const [loadedBarWidth, setLoadedBarWidth] = useState(0);
    useEffect(() => {
        if (mintState !== undefined)
            setLoadedBarWidth(loadedBarRef.current.offsetWidth);
    }, [loadedBarRef.current, mintState]);

    useEffect(() => {

        const load = async () => {
            const accountData = await getMintData(connection);
            const state = decodeMintData(accountData);
            setMintState(state);
        };

        // connection.onAccountChange(MINT_CONFIG_ADDRESS, (accountInfo, _) => {
        //     const state = decodeMintData(accountInfo.data);
        //     setMintState(state);
        // });

        load();
    },
        [])

    return <Box w="100%">
        {
            mintState === undefined
                ?
                <></>
                :
                <Box pl="7px" pr="7px">
                    <Text mb="5px" ml={loadedBarWidth - 40 + "px"} width="80px" textAlign="center"
                        fontWeight="600" fontSize="24px" lineHeight="28.13px" color="#B8C3E6">
                        {mintState.mintedAmount}
                    </Text>
                    <Img mb="8px" w={srcWidth} ml={loadedBarWidth - srcWidth / 2 + "px"} src="/triangle.svg" />
                </Box>
        }
        <Box pt="6px" pl="7px" pr="7px" pb="6px" w="100%" h="64px" backgroundColor="#B2B2B2" borderRadius="24px" boxShadow="0px 0px 8px 0px #20202080 inset">
            {
                mintState === undefined
                    ?
                    <></>
                    :
                    mintState.mintedAmount / mintState.supply !== 1
                        ?
                        <Box ref={loadedBarRef} w={mintState.mintedAmount / mintState.supply !== 1 ? mintState.mintedAmount / mintState.supply : "100%"} h="52px" backgroundColor="#E8E8E8" borderLeftRadius="20px" boxShadow="0px 0px 4px 0px #20202040"></Box>
                        :
                        <Box ref={loadedBarRef} w="100%" h="52px" backgroundColor="#E8E8E8" borderRadius="20px" boxShadow="0px 0px 4px 0px #20202040"></Box>
            }
        </Box>
        <Text mt="7px" pr="20px" fontWeight="600" fontSize="24px" lineHeight="28.13px" color="#B8C3E6" textAlign="right">Total: 1 111</Text>
    </Box>
}

export const Mint = () => {
    const size = useWindowSize();

    const toast = useToast();

    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;
    const wallet = useWallet();
    const { connection } = useConnection();
    const [load, setLoad] = useBoolean(true);
    const [mintStatus, setMintStatus] = useState<WhitelistStatus>('NONE');
    const [userStageInfo, setUserStageInfo] = useState<UserStageInfo>({ mintStage: 'PUBLIC', remainingMints: 10 });
    const [version, setVersion] = useState<number>(0);
    const [canMint, setCanMint] = useBoolean(false);

    // async function mintClick(e: MouseEvent<HTMLDivElement>) {
    //     setLoad.off();

    //     try {
    //         if (!wallet.publicKey) {
    //             return;
    //         }
    //         if (mintStatus === 'NONE') {
    //             if (!toast.isActive("walletStageCheck")) {
    //                 toast({
    //                     id: "walletStageCheck",
    //                     title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                     status: 'info',
    //                     position: 'top',
    //                     isClosable: true,
    //                 });
    //             }
    //             return;
    //         }
    //         if (mintStatus === 'OG' && userStageInfo.mintStage !== 'OG') {
    //             if (!toast.isActive("walletStageCheck")) {
    //                 toast({
    //                     id: "walletStageCheck",
    //                     title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                     status: 'info',
    //                     position: 'top',
    //                     isClosable: true,
    //                 });
    //             }
    //             return;
    //         }
    //         if (mintStatus === 'WL' && userStageInfo.mintStage !== 'OG' && userStageInfo.mintStage !== 'WL') {
    //             if (!toast.isActive("walletStageCheck")) {
    //                 toast({
    //                     id: "walletStageCheck",
    //                     title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                     status: 'info',
    //                     position: 'top',
    //                     isClosable: true,
    //                 });
    //             }
    //             return;
    //         }

    //         const userData = await getUserData(wallet.publicKey, connection);
    //         const tx = new Transaction();
    //         tx.feePayer = wallet.publicKey;
    //         tx.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

    //         let sendLamports = 0;

    //         switch (userStageInfo.mintStage) {
    //             case 'OG':
    //                 sendLamports = 150_000_000;
    //                 break;

    //             default:
    //                 sendLamports = 200_000_000;
    //                 break;
    //         }

    //         tx.add(
    //             SystemProgram.transfer({
    //                 fromPubkey: wallet.publicKey,
    //                 toPubkey: MINT_ADMIN_ACCOUNT,
    //                 lamports: sendLamports
    //             })
    //         );

    //         if (!userData) {
    //             tx.add(await createUserData(wallet.publicKey));
    //         }

    //         const mint = new Keypair();
    //         tx.add(await mintOne(wallet.publicKey, mint));
    //         let signedTransaction: Transaction | null = undefined;

    //         try {
    //             signedTransaction = await wallet.signTransaction(tx);
    //         }
    //         catch (e) {
    //             if (!toast.isActive("userCancellation"))
    //                 toast({
    //                     id: "userCancellation",
    //                     title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                     status: 'info',
    //                     position: 'top',
    //                     isClosable: true,
    //                 });
    //             return;
    //         }

    //         try {
    //             signedTransaction.partialSign(mint);
    //             const signature = await getAuthorityMintSig(signedTransaction, wallet.publicKey, mint.publicKey);
    //             try {
    //                 if (!signature) {
    //                     throw 'No signature from server';
    //                 }
    //             } catch (e) {
    //                 if (!toast.isActive("serverCancellation"))
    //                     toast({
    //                         id: "serverCancellation",
    //                         title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                         status: 'error',
    //                         position: 'top',
    //                         isClosable: true,
    //                     });
    //                 return;
    //             }

    //             signedTransaction.addSignature(MINT_AIRDROP_AUTHORITY, signature);
    //             const logs = await connection.simulateTransaction(signedTransaction);

    //             console.log(logs.value.logs);

    //             const solConnection = new Connection('https://solana-api.projectserum.com');
    //             const result = await solConnection.sendRawTransaction(signedTransaction.serialize());
    //             const success = await waitForConfirmation(connection, result, 30);

    //             if (!success) {
    //                 throw new Error('Timeout');
    //             }

    //             await confirmMint(wallet.publicKey.toBase58());
    //         }
    //         catch (e) {
    //             if (!toast.isActive("blockchainCancellation"))
    //                 toast({
    //                     id: "blockchainCancellation",
    //                     title: 'Ooops, it seems like Solana Error. Please refresh the page and try again',
    //                     status: 'error',
    //                     position: 'top',
    //                     isClosable: true,
    //                 });
    //             console.error(e)
    //         }
    //     }
    //     catch (e) {

    //     } finally {
    //         setVersion(version + 1);
    //         setLoad.on()
    //     }
    // }

    useEffect(() => {
        async function load() {
            if (wallet.publicKey) {
                const newUserStageInfo: UserStageInfo = await getWalletStatus(wallet.publicKey.toBase58());
                setUserStageInfo(_ => newUserStageInfo);
            }
        }

        load();
    }, [wallet.publicKey]);

    useEffect(() => {
        async function load() {
            const newMintStatus = await getMintStatus();
            setMintStatus(_ => newMintStatus);
        }

        load();
    }, []);

    useEffect(() => {
        async function parse() {

            if (mintStatus == "NONE") {
                return;
            }

            if (wallet.publicKey) {
                console.log(new Date().getTime());
                const timeoutEndTime = localStorage.getItem("timeoutEndTime");
                if (!timeoutEndTime) {
                    localStorage.setItem("timeoutEndTime", new Date().getTime().toString());
                    setCanMint.on();
                } else if (+timeoutEndTime < new Date().getTime()) {
                    await getCards(wallet.publicKey?.toBase58());
                    localStorage.setItem("timeoutEndTime", (new Date().getTime() + 30000).toString());
                    setCanMint.on();
                }
            } else {
                setCanMint.on();
            }
        }

        parse();
    }, [wallet.publicKey, mintStatus]);

    return <Layout>
        {!connected ?
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Center>
                <Box mt="80px" mb="232px" maxW="1440px" w="100%" pl={size.width < 500 ? "24px" : "96px"} pr={size.width < 500 ? "24px" : "96px"}>
                    <Stack direction={size.width < 1260 ? "column" : "row"} spacing={size.width < 1260 ? "40px" : "auto"}>
                        <Center>
                            <VStack maxW="612px" w="100%" spacing="0px">
                                <MainText marginBottom="56px" />
                                <Box pb={size.width < 12600 ? "31px" : "51px"} w="100%" borderTop="2px solid #E8E8E826" />
                                <ProgressPanel />
                                <Box h="16px" />

                                {
                                    size.width < 640
                                        ? <HStack spacing="10px">
                                            <Box className={mintStatus === 'OG' ? styles.currentStageBox_small : styles.stageBox_small}>OG</Box>
                                            <Box className={mintStatus === 'WL' ? styles.currentStageBox_small : styles.stageBox_small}>WL</Box>
                                            <Box className={mintStatus === 'PUBLIC' ? styles.currentStageBox_small : styles.stageBox_small}>Public</Box>
                                        </HStack>
                                        :
                                        <HStack spacing="23px">
                                            <Box className={mintStatus === 'OG' ? styles.currentStageBox : styles.stageBox}>OG stage</Box>
                                            <Box className={mintStatus === 'WL' ? styles.currentStageBox : styles.stageBox}>WL stage</Box>
                                            <Box className={mintStatus === 'PUBLIC' ? styles.currentStageBox : styles.stageBox}>Public stage</Box>
                                        </HStack>
                                }


                            </VStack>
                        </Center>
                        <VStack>
                            {
                                size.width < 680
                                    ?
                                    <Img w="290px" h="290px" src='/combat-cards-mint.gif' borderRadius="40px" boxShadow="0px 4px 4px 0px #00000040" />
                                    :
                                    <Img w="424px" h="424px" src='/combat-cards-mint.gif' borderRadius="40px" boxShadow="0px 4px 4px 0px #00000040" />
                            }
                            {
                                !load
                                    ?
                                    <Flex alignItems="center" justifyContent="center">
                                        <div className={styles.smallDonut} />
                                    </Flex>
                                    :
                                    canMint
                                        ?
                                        <Box w={size.width < 680 ? "290px" : ""} className={styles.mintButton}>MINT</Box>
                                        :
                                        <Box className={styles.smallDonut}/>
                            }
                        </VStack>
                    </Stack>
                </Box>
            </Center>
        }
    </Layout>
}
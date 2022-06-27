import {useWindowSize} from "../../../hooks/useWindowSize";
import {
    Box,
    BoxProps,
    Divider,
    Flex,
    Stack,
    HStack,
    StackProps,
    Text,
    useDimensions,
    VStack,
    Center
} from "@chakra-ui/react";
import {useEffect, useRef, useState, ReactNode} from "react";
import {PoolWarsBox} from "../Layout/PoolWarsBox";
import useElementSize from "../../../hooks/useElementSize";

type RoadmapStageProps  = {
    title: string,
    children?: ReactNode
} & StackProps;

const RoadmapStage = ({title, children, ...stackProps} : RoadmapStageProps) => {
    const size = useWindowSize();
    return <Stack spacing="0px" width="100%" justifyContent="space-after" direction="row" {...stackProps}>
        <Center>
            <PoolWarsBox height="66px" width="66px" fontSize="0%"/>
        </Center>
        <Box paddingLeft={size.width <= 425 ? "10px" :"50px"} paddingRight="10px" maxWidth="946px">
            <Box color="#7951F5" marginBottom="10px" fontWeight="700" fontSize="34px" lineHeight="51px">{title}</Box>
            <Box color="#E8E3DD" fontWeight="300" fontSize="20px" lineHeight="30px">{children}</Box>
        </Box>
    </Stack>
}

export const Roadmap = (props: BoxProps) => {
    const size = useWindowSize();
    const roadmapTitleRef = useRef(null);
    const [mainDividerMarginLeft, setMainDividerMarginLeft] = useState(0);
    useEffect(() => {
         setMainDividerMarginLeft(roadmapTitleRef.current.offsetWidth);
    }, [roadmapTitleRef.current]);

    const roadmapStagesRef = useRef(null);
    const roadmapStagesSize = useElementSize(roadmapStagesRef);

    const [mainDividerStagesHeight, setMainDividerStagesHeight] = useState(0);
    useEffect(() => {
        let delta = 20;
        if (size.width <= 680) delta = -40;
        setMainDividerStagesHeight (roadmapStagesSize.height + delta);
    }, [roadmapStagesSize.height]);


    return <Box marginTop="131px" marginBottom="50px"
                marginLeft={size.width <= 768 ? size.width <= 425 ? "10px" : "50px" : "5.5%"} position="relative"
                {...props}>
        <Box marginBottom="10px" fontFamily="Trap" fontWeight="900" fontSize="60px" lineHeight="63px">
            <Flex justifyContent="space-after">
                <Text ref={roadmapTitleRef}>Roadmap</Text>
            </Flex>
        </Box>

        <Divider width="100vw" marginLeft={size.width <= 768 ? size.width <= 425 ? "-10px" : "-50px" : "0px"} border="2px solid #D3CDC6" filter="blur(1px)" />

        <Divider position="absolute" zIndex={-100}
                 width={mainDividerStagesHeight+"px"}
                 top={mainDividerStagesHeight/2+75+"px"}
                 left={ roadmapTitleRef.current === null ? "0px" :
                     size.width <= 768 ? -mainDividerStagesHeight/2 + 33 +"px" :
                     -mainDividerStagesHeight/2 + mainDividerMarginLeft/2+"px"}
                 transform="rotate(90deg)"
                 border="2px solid #D3CDC6" filter="blur(1px)"/>

        <VStack zIndex={1}
                ref={roadmapStagesRef}
                marginTop="50px"
                marginLeft={roadmapTitleRef.current === null ? "0px" : size.width <= 768 ?
                    "0" :
                    mainDividerMarginLeft/2-33+"px"}
                spacing="93px"
                fontFamily="Onest">
            <RoadmapStage title={"Stage 0"}>Airdrop of Warlords Card NFT collection.
                Launch Nft Swaps and Pool Wars Events V0. Also, there will be collaborations with other collections
                and ruffles for whitelist. At this step we are creating a strong community.
            </RoadmapStage>

            <RoadmapStage title={"Stage 1"}>Mint Warlords Collection. First hours of mint
                time will be the time for whitelisted members, after this everyone will get a chance to mint
                warlords.
            </RoadmapStage>

            <RoadmapStage title={"Stage 2"}>Launch Pool Wars Events V1, staking warlords
                nft and improving warlord system. Also, there will be a weekly ruffle for Warlord’s owners for part
                of royalty.
            </RoadmapStage>

            <RoadmapStage title={"Stage 3"}>Launch a DAO. By DAO we will make next decisions
                and realize the coolest ideas of our community.
            </RoadmapStage>
        </VStack>
    </Box>
}
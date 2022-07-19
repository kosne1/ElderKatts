import {useWindowSize} from "../../../hooks/useWindowSize";

import {
    Box, BoxProps,


    Divider,
    Flex,
    HStack,
    Text
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState, useMemo} from "react";

const RoadmapStageTitle = ({marginTop, title, children, location}) => {
    const size = useWindowSize();
    const stageBallRadius = 12;
    const defaultPadding = 96;
    const borderDivider = 2;
    const spacing = 38;
    const curedDividerWidth = defaultPadding / 2;
    const stageTitleRef = useRef(null);
    const [stageTitleWidth, setStageTitleWidth] = useState(0);
    useEffect(() => {
        setStageTitleWidth(stageTitleRef.current.offsetWidth);
    }, [stageTitleRef.current]);
    const stageLeftTitlePadding = (size.width - 2 * defaultPadding) / 2 - stageTitleWidth - spacing - stageBallRadius;
    const stageRightTitlePadding = (size.width - 2 * defaultPadding) / 2 - stageBallRadius;
    if (location)
        return <Box pl={stageRightTitlePadding+"px"} mt={marginTop}>
            <HStack  justifyContent="space-after" direction="row" spacing={spacing+"px"}>
                <Box background="#B2B2B2" w="24px" h="24px" borderRadius={stageBallRadius+"px"}/>
                <Box ref={stageTitleRef} color="#71CFC3" fontWeight="600" fontSize="32px" lineHeight="48px">{title}</Box>
            </HStack>
            <Box pl={stageBallRadius*2+spacing+"px"} maxWidth={(size.width-defaultPadding)/2}
                 fontWeight="300" lineHeight="30px" fontSize="20px">{children}</Box>
        </Box>
    else return <Box mt={marginTop}>
            <HStack pl={stageLeftTitlePadding+"px"} justifyContent="space-after" direction="row" spacing={spacing+"px"}>
                <Box ref={stageTitleRef} color="#71CFC3" fontWeight="600" fontSize="32px" lineHeight="48px">{title}</Box>
                <Box background="#B2B2B2" w="24px" h="24px" borderRadius={stageBallRadius+"px"}/>
        </HStack>
        <Box pr={2*(stageBallRadius+spacing)+"px"} maxWidth={(size.width-defaultPadding)/2} fontWeight="300" lineHeight="30px"
             textAlign="right" fontSize="20px">{children}</Box>
    </Box>
}

export const Roadmap = (props: BoxProps) => {
    const size = useWindowSize();

    const roadmapStagesRef = useRef(null);
    const [roadmapStagesTitleWidth, setRoadmapStagesTitleWidth] = useState(0);
    useEffect(() =>{
        setRoadmapStagesTitleWidth(roadmapStagesRef.current.offsetHeight-28);
    }, [roadmapStagesRef.current, size.width]);

    const defaultPadding = useMemo(() => {
        if (size.width < 768) return 30;
        else return 96;
    }, [size]);
    const defaultMarginTop = 92;
    const curedDividerWidth = defaultPadding / 2;
    const borderWidth = useMemo(() => {
        return (size.width - defaultPadding)/2;
    }, [size]);

    return <Box pl={defaultPadding+"px"} pr={defaultPadding+"px"} {...props}>
        <Divider mb="80px" borderColor="#E8E8E826" border="0.5px"/>
        <Text fontFamily="Njord" fontWeight="400" fontSize="64px" lineHeight="52px">Roadmap</Text>

        <Box mt={size.width < 768 ? "20px" : "0px"}>
            <Flex>
                <Divider position="absolute" ml={borderWidth+1} width={size.width/2} borderColor="#E8E8E880" borderBottom="2px"/>
                <Divider ml={borderWidth-defaultPadding/2-1+"px"} position="absolute" width={defaultPadding/2+"px"}
                         height={defaultPadding/2+"px"} borderColor="#E8E8E880"
                         borderRight="2px" borderBottom="2px" borderRadius="0 0 50px 0" transform="rotate(180deg)"/>
                <Divider position="absolute" marginTop={roadmapStagesTitleWidth/2+curedDividerWidth+1+"px"}
                         marginLeft={size.width/2-defaultPadding-roadmapStagesTitleWidth/2+"px"} width={roadmapStagesTitleWidth+"px"}
                         borderColor="#E8E8E880" borderBottom="2px" transform="rotate(90deg)"/>
            </Flex>

            <Box ref={roadmapStagesRef}>
                <RoadmapStageTitle marginTop={size.width < 768 ? "20px" : defaultMarginTop+"px"} title="Stage 0" location={size.width < 768}>Stage 0 Airdrop of Combat Cards. We will be providing utility for the owners of Combat Cards already before the mint of the main collection. You will be able to participate in Nft Swaps and &quot;Pool Wars &quot; v0. Our team will make collaborations with large, established and younger developing projects. At this stage we are creating a strong community of fearless warriors.</RoadmapStageTitle>
                <RoadmapStageTitle marginTop={size.width < 768 ? "20px" : "-110"} title="Stage 1" location={true}>Mint of Elder Katts Collection. First hours of mint will be reserved for OG Katts and Whitelisted Katts, after this everyone will get a chance to mint their own Katt.</RoadmapStageTitle>
                <RoadmapStageTitle marginTop={size.width < 768 ? "20px" : "0"} title="Stage 2" location={size.width < 768}>Launch of &quot;Pool Wars Events&quot; v1, that will be available for everyone. We will be announcing Staking and implementing Tokenomics. Also, there will be weekly raffles for part of the royalties for Katt owners only.</RoadmapStageTitle>
                <RoadmapStageTitle marginTop={size.width < 768 ? "20px" : "-10"} title="Stage 3" location={true}>Launch a DAO. By Elder Katts DAO will be decided on important changes to the Katts ecosystem. Our team will realize the coolest and craziest ideas of our valorous community.</RoadmapStageTitle>
            </Box>

            <Flex>
                <Divider mt={-defaultPadding/2-22+"px"} ml={borderWidth-defaultPadding-1+"px"} position="absolute" width={defaultPadding/2+"px"}
                         height={defaultPadding/2+"px"} borderColor="#E8E8E880"
                         borderRight="2px" borderBottom="2px" borderRadius="0 0 50px 0"/>
                <Divider mt={-defaultPadding/2-22+"px"} ml={-defaultPadding-defaultPadding/2-1+"px"} position="absolute" width={size.width/2+"px"} borderBottom="2px"
                         height={defaultPadding/2+"px"} borderColor="#E8E8E880"/>
            </Flex>
        </Box>
    </Box>
}
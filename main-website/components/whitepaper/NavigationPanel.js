import {Box, Center, Flex, Text, VStack} from "@chakra-ui/react";
import {getSectionPathName, sections} from "./navigation";
import {useWindowSize} from "../../hooks/useWindowSize";
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons';
import {useRouter} from "next/router";
import {useState} from "react";

function getSectionId(section){
    return sections.indexOf(section);
}

function getPreviousSection(section){
    return sections[getSectionId(section) - 1];
}

function getNextSection(section){
    return sections[getSectionId(section) + 1];
}

export const NavigationPanel = ({currentSection, setCurrentSection}) => {
    const size = useWindowSize();
    let miniSize = size.width != null && size.width <= 910;
    const router = useRouter();

    const [isFirstHover, setFirstHover] = useState(false);
    const [isSecondHover, setSecondHover] = useState(false);

    const goNextSection = () => {
        let sectionId = getSectionId(currentSection);
        setCurrentSection(sections[sectionId + 1]);
        setSecondHover(false);
        setFirstHover(false);
        router.push("/whitepaper/" + getSectionPathName(sections[sectionId + 1]))
    }

    const goPreviousSection = () => {
        let sectionId = getSectionId(currentSection);
        setCurrentSection(sections[sectionId - 1]);
        setSecondHover(false);
        setFirstHover(false);
        router.push("/whitepaper/" + getSectionPathName(sections[sectionId - 1]))
    }

    let isFirstButton = getSectionId(currentSection) < sections.length - 1;
    let isSecondButton = getSectionId(currentSection) > 0;

    let firstButton = isFirstButton ?
    <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
         border={isFirstHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"} borderRadius="4px" onClick={goNextSection}
         onMouseEnter={() => setFirstHover(true)}
         onMouseLeave={() => setFirstHover(false)} padding="16px">
        <Center height="100%">
            <Flex width="100%" justifyContent="space-between" direction="row-reverse">
                <Center><ArrowForwardIcon color={isFirstHover ? "rgb(52, 109, 219)" : "rgba(136,153,168,1.00)"} w="24px" h="24px"/></Center>

                <VStack height="42px" spacing="0">
                    <Text width="100%" fontSize="12px" lineHeight="18px" color="rgba(136,153,168,1.00)" textAlign="left">Next</Text>
                    <Text width="100%" fontSize="16px" lineHeight="24px" marginTop="0" textAlign="left" color={isFirstHover ? "rgb(52, 109, 219)" : "inherit"}>{getNextSection(currentSection)}</Text>
                </VStack>
            </Flex>
        </Center>
    </Box> : "";

    let secondButton = isSecondButton ?
    <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
         border={isSecondHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}borderRadius="4px" padding="16px"
         onClick={goPreviousSection} onMouseEnter={() => setSecondHover(true)}
         onMouseLeave={() => setSecondHover(false)}>
        <Center height="100%">
            <Flex width="100%" justifyContent="space-between">
                <Center><ArrowBackIcon color={isSecondHover ? "rgb(52, 109, 219)" : "rgba(136,153,168,1.00)"} w="24px" h="24px"/></Center>

                <VStack height="42px" spacing="0">
                    <Text width="100%" fontSize="12px" lineHeight="18px" color="rgba(136,153,168,1.00)" textAlign="right"> Previous</Text>
                    <Text width="100%" fontSize="16px" lineHeight="24px" marginTop="0" textAlign="right" color={isSecondHover ? "rgb(52, 109, 219)" : "inherit"}>{getPreviousSection(currentSection)}</Text>
                </VStack>
            </Flex>
        </Center>
    </Box> : "";

    return <Box marginTop="24px">
        <Flex direction={isFirstButton ? !miniSize ? "row" : "column" : ""} width="100%" wrap="wrap">
            {secondButton}
            {isFirstButton && isSecondButton ? <Box width="16px" height="16px" /> : ""}
            {firstButton}
        </Flex>
        <hr style={{marginTop: "24px",marginBottom:"24px"}}/>
        <Text color="rgba(136,153,168,1.00)" marginBottom="40px">Last modified 1mo ago</Text>
    </Box>;
}
import {Box} from "@chakra-ui/react";

export const FirstSpot = ({top}) => {
    return <Box position="absolute" width="1040px" height="975px" right="-200px" top={top}
                backgroundColor="rgba(51, 60, 237, 0.48);" filter="blur(482px)" zIndex={-100}/>;
}
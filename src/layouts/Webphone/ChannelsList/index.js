import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { Circle, QrCode } from "@phosphor-icons/react";
// import { useWebphone } from "../../../contexts/Webphone";

export const ChannelsList = () => {
  // const { token } = useWebphone();

  return (
    <>
      <VStack
        gap={2}
        width="95%"
        maxHeight="300px"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            background: "#00000015",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#00000050",
            borderRadius: "24px",
          },
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map(() => (
          <HStack
            w="full"
            px={5}
            py={2}
            cursor="pointer"
            _hover={{
              backgroundColor: "#00000010",
            }}
          >
            <Avatar
              size="md"
              name="Christian Nwamba"
              src="https://bit.ly/code-beast"
            />{" "}
            <VStack
              justifyContent="flex-start"
              alignItems="flex-start"
              flexGrow={1}
            >
              <Text textAlign="start" color="white">
                teste
              </Text>
              <Text color="white" as="small">
                +55 11 973951769
              </Text>
            </VStack>
            <HStack>
              {true && <QrCode size={15} weight="fill" color="white" />}
              {false && <Circle size={15} weight="fill" color="#43c414" />}
              {false && <Circle size={15} weight="fill" color="#980101" />}
            </HStack>
          </HStack>
        ))}
      </VStack>
    </>
  );
};

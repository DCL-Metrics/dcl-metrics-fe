import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react"

const TooltipTable = ({ date, count, degraded, bar, name, color }) => {
  return (
    <Flex fontSize="sm">
      <Center mr="2">
        <Box boxSize="3" bg={color} borderRadius="xl" shadow="md" />
      </Center>
      <Box mr="2">
        <Text>{name}</Text>
      </Box>
      <Spacer />
      <Box ml="2" color={degraded && "red"}>
        <Text as="kbd">{count}</Text>
      </Box>
    </Flex>
  )
}

export default TooltipTable

import {
  Image,
  Box,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"

const MapImage = ({ isPicLoading, name, image, isMapExpanded }) => {
  const mapHeight = isMapExpanded ? 250 : 100
  return (
    <Box w="100%" h={[100, 125, mapHeight]} mb={isMapExpanded && 4} p="2">
      <Center h={[100, 125, mapHeight]}>
        {isPicLoading ? (
          <Spinner />
        ) : (
          <Box
            overflow="hidden"
            w="100%"
            h={[100, 125, mapHeight]}
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius="xl"
            shadow="md"
          >
            <Image
              minW="100%"
              h={[100, 125, mapHeight]}
              objectFit="cover"
              alt={name}
              src={image}
            />
          </Box>
        )}
      </Center>
    </Box>
  )
}

export default MapImage
import {
  Text,
  Box,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"
import MapMenu from "./MapMenu"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

const MapButtonGroup = ({
  isMapExpanded,
  setIsMapExpanded,
  zoom,
  setZoom,
  tempCoord,
  properties,
  selectedProp,
  setSelectedProp,
  textColor,
  btnBg,
  handle,
  setMapHeight,
}) => {
  const handleFullscreen = () => {
    if (!handle.active) {
      setMapHeight({ expanded: "100vh", collapsed: "100vh" })
      handle.enter()
    } else {
      // default map height
      setMapHeight({ collapsed: 500, expanded: "80vh" })
      handle.exit()
    }
  }

  return (
    <>
      <Flex pos="absolute" w="100%" p="2">
        <Box>
          <Button
            zIndex="docked"
            mr="2"
            bg={btnBg}
            borderRadius="xl"
            shadow="md"
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            size="sm"
            variant="solid"
          >
            {isMapExpanded ? "Collapse" : "Expand"}
          </Button>
          <Button
            zIndex="docked"
            bg={btnBg}
            borderRadius="xl"
            shadow="md"
            onClick={() => handleFullscreen()}
            size="sm"
            variant="solid"
          >
            {handle.active ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </Box>
        <Spacer />
        <Button
          pos="absolute"
          zIndex="docked"
          top="2"
          right="2"
          bg={btnBg}
          borderRadius="xl"
          size="sm"
        >
          <Text as="kbd" color={useColorModeValue("black", "white")}>
            [{tempCoord.x},{tempCoord.y}]
          </Text>
        </Button>
      </Flex>
      <Flex>
        <Box pos="absolute" zIndex="docked" bottom="2" left="2">
          <MapMenu
            btnBg={btnBg}
            properties={properties}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
        </Box>
        <Spacer />
        <Box pos="absolute" zIndex="docked" right="2" bottom="2" shadow="md">
          <ButtonGroup isAttached>
            <Button
              zIndex="docked"
              bg={btnBg}
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom - 0.5).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              -
            </Button>
            <Button
              zIndex="docked"
              bg={btnBg}
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom + 0.5).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  )
}

export default MapButtonGroup

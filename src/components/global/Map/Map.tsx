/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  Text,
  Center,
  Flex,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Spacer,
  Spinner,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import "react-tile-map/lib/styles.css"
import { Coord, Layer, TileMap, TileMapProps } from "react-tile-map"

const Map = ({ h, coord, setCoord, selectedParcel, setSelectedParcel }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }

  const mapBoxCss = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  }

  const COLOR_BY_TYPE: Record<number | string, string> = {
    0: "#ff9990", // my parcels
    1: "#ff4053", // my parcels on sale
    2: "#ff9990", // my estates
    3: "#ff4053", // my estates on sale
    4: "#ffbd33", // parcels/estates where I have permissions
    district: "#5054D4", // districts
    6: "#563db8", // contributions
    road: "#716C7A", // roads
    plaza: "#70AC76", // plazas
    owned: "#3D3A46", // owned parcel/estate
    10: "#3D3A46", // parcels on sale (we show them as owned parcels)
    unowned: "#09080A", // unowned pacel/estate
    12: "#18141a", // background
    13: "#110e13", // loading odd
    14: "#0d0b0e", // loading even
  }

  // const { layers = [], onChange, onPopup, onClick, ...rest } = props
  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })
  const [tiles, setTiles] = useState([])
  const [isHover, setIsHover] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [isMapExpanded, setIsMapExpanded] = useState(false)

  const layers = []
  const highlights = []

  const getLandById = (x: number, y: number) => {
    const id = `${x},${y}`
    return highlights.find((coord) => {
      return coord.id === id
    })
  }

  // const onClickAtlasHandler = (x: number, y: number) => {
  //   if (!tiles) return
  //   const land = getLandById(x, y)
  //   if (land) {
  //     console.log(land)
  //     // land?.landId && setSelectedId && setSelectedId(land.landId)
  //     // setClickedLandId && setClickedLandId(x, y)
  //   }
  // }

  const [selected, setSelected] = useState([])
  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff0044", scale: 1.2 } : null
  }

  const selectedFillLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff9990", scale: 1.2 } : null
  }

  const handleClick = (x: number, y: number) => {
    const id = x + "," + y
    setSelectedParcel(tiles[id])
    if (isSelected(x, y)) {
      setSelected(selected.filter((coord) => coord.x !== x && coord.y !== y))
    } else {
      setSelected([{ x, y }])
    }
  }

  const fetchTiles = async (
    url: string = "https://api.decentraland.org/v2/tiles"
  ) => {
    if (!window.fetch) return {}
    console.log("fetching tiles..")
    setIsMapLoading(true)
    const resp = await window.fetch(url)
    const json = await resp.json()
    setTiles(json.data)
    setIsMapLoading(false)
  }

  // memoize layer
  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
        owner: tile.owner,
        estateId: tile.estateId,
        tokenId: tile.tokenId,
        type: tile.type,
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
      }
    }
  }

  // trigger fetchTiles() once and never call it again if it's called successfully
  useEffect(() => {
    fetchTiles()
  }, [])

  const onResetClick = () => {
    setSelected([])
  }

  return (
    <Box
      w={["100%", "100%", "100%", "70%"]}
      h="auto"
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <GridItem sx={mapBoxCss} w={box.w} h="100%" bg={box.bg} borderRadius="xl">
        <Box p="4">
          <Box
            overflow="hidden"
            h={!isMapExpanded ? "400" : "800"}
            bg="#25232A"
            borderRadius="xl"
            shadow="md"
            onMouseEnter={() => {
              setIsHover(true)
            }}
            onMouseLeave={() => {
              setIsHover(false)
            }}
          >
            {!isMapLoading ? (
              <>
                {isHover && (
                  <Flex pos="absolute" zIndex="banner" w="100%" p="2">
                    <Box mr="2">
                      <Button
                        bg={useColorModeValue("gray.200", "gray.600")}
                        borderRadius="xl"
                        onClick={() => onResetClick()}
                        size="sm"
                        variant="solid"
                      >
                        Reset
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        bg={useColorModeValue("gray.200", "gray.600")}
                        borderRadius="xl"
                        onClick={() => setIsMapExpanded(!isMapExpanded)}
                        size="sm"
                        variant="solid"
                      >
                        {isMapExpanded ? "Collapse" : "Expand"}
                      </Button>
                    </Box>
                  </Flex>
                )}
                {isHover && (
                  <Box pos="absolute" zIndex="banner" bottom="4" left="4">
                    <Text color={useColorModeValue("white", "black")}>
                      [{tempCoord.x}, {tempCoord.y}]
                    </Text>
                  </Box>
                )}
                <TileMap
                  layers={[
                    layer,
                    selectedStrokeLayer,
                    selectedFillLayer,
                    ...layers,
                  ]}
                  onHover={(x, y) => {
                    setTempCoord({ x, y })
                  }}
                  onClick={(x, y) => {
                    setCoord({ x, y })
                    handleClick(x, y)
                    // onClickAtlasHandler(x, y)
                  }}
                />
              </>
            ) : (
              <Center h="100%">
                <Spinner />
              </Center>
            )}
          </Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map

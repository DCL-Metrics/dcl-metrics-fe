/* eslint-disable react-hooks/rules-of-hooks */
import {
  Center,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { SceneColor } from "../../../../../lib/hooks/utils"
import ToolTip from "../../../../layout/local/ToolTip"

const SceneParcelsHeatmap = ({ data, selectedScene }) => {
  const router = useRouter()

  const heatmapHeight = 400

  const minX = Math.min(
    ...Object.keys(data).map((d) => Number(d.split(",")[0]))
  )
  const maxX = Math.max(
    ...Object.keys(data).map((d) => Number(d.split(",")[0]))
  )
  const minY = Math.min(
    ...Object.keys(data).map((d) => Number(d.split(",")[1]))
  )
  const maxY = Math.max(
    ...Object.keys(data).map((d) => Number(d.split(",")[1]))
  )

  const grid = []

  for (let y = minY; y <= maxY; y++) {
    const row = []
    for (let x = minX; x <= maxX; x++) {
      row.push({ x, y, value: data[`${x},${y}`] || 0 })
    }
    grid.push(row)
  }

  const normalizedData = grid.flat().map((d) => d.value)
  const normalizedMin = Math.min(...normalizedData)
  const normalizedMax = Math.max(...normalizedData)
  const normalizedGrid = grid.map((row) =>
    row.map((d) => {
      const normalizedValue = Math.floor(
        ((d.value - normalizedMin) / (normalizedMax - normalizedMin)) * 100
      )
      return { ...d, normalizedValue }
    })
  )

  const setBgColor = (value: number) => {
    const i = selectedScene
    const res =
      SceneColor[i].substring(0, SceneColor[i].toString().length - 1) +
      ", " +
      value +
      ")"
    return res
  }

  return (
    <Tooltip
      sx={{ backdropFilter: "blur(5px)" }}
      m="2"
      py="1"
      color={useColorModeValue("black", "white")}
      fontSize="xs"
      fontWeight="semibold"
      bg={useColorModeValue("gray.50", "gray.600")}
      border="1px solid"
      borderColor={useColorModeValue("gray.600", "gray.200")}
      borderRadius="xl"
      shadow="md"
      label="This chart shows the visitor heatmap of each coordinate in this scene"
      placement="bottom"
    >
      <Box
        w="100%"
        bg={useColorModeValue("white", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box borderRadius="xl">
          <Box
            overflow="hidden"
            h={heatmapHeight}
            m="4"
            bg={useColorModeValue("gray.50", "gray.800")}
            borderRadius="xl"
            shadow="md"
          >
            {normalizedGrid.reverse().map((row, i) => {
              return (
                <Flex key={i}>
                  {row.map((cell, j) => {
                    return (
                      <ToolTip key={j} label={`Jump to [${cell.x}, ${cell.y}]`}>
                        <Box
                          w="100%"
                          h={
                            heatmapHeight / normalizedGrid.length - 1 + 1 + "px"
                          }
                          bg={setBgColor(cell.normalizedValue / 100)}
                          border="1px solid"
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          borderColor={useColorModeValue(
                            "gray.200",
                            "gray.600"
                          )}
                          borderTopLeftRadius={i === 0 && j === 0 && "xl"}
                          borderTopRightRadius={
                            i === 0 && j === row.length - 1 && "xl"
                          }
                          borderBottomRightRadius={
                            i === normalizedGrid.length - 1 &&
                            j === row.length - 1 &&
                            "xl"
                          }
                          borderBottomLeftRadius={
                            i === normalizedGrid.length - 1 && j === 0 && "xl"
                          }
                          _hover={{
                            bg: setBgColor(cell.normalizedValue / 50),
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            router.push("/map?x=" + cell.x + "&y=" + cell.y)
                          }}
                        >
                          <Center h="100%">
                            <Text
                              fontSize={[
                                heatmapHeight / 5 / row.length + "px",
                                heatmapHeight / 4 / row.length + "px",
                              ]}
                            >
                              {cell.value}
                            </Text>
                          </Center>
                        </Box>
                      </ToolTip>
                    )
                  })}
                </Flex>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Tooltip>
  )
}

export default SceneParcelsHeatmap

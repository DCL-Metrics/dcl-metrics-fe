/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { useMemo } from "react"
import {
  Box,
  useColorModeValue,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"
import { ResponsiveLine } from "@nivo/line"

const SceneTimeSpentHistogram = ({ data, selectedScene }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })
  return (
    <Box h="300">
      <MyResponsiveLine
        res={timeSpentHistogramArr}
        selectedScene={selectedScene}
      />
    </Box>
  )
}

export default SceneTimeSpentHistogram

const MyResponsiveLine = ({ res, selectedScene }) => {
  // selected line color
  const lineOpacity = 0.2
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b},${lineOpacity})`
  }

  const data = res.map((item) => {
    return {
      id: item.name,
      // random color
      color: randomColor(),
      data: item.map((item) => {
        return {
          x: item[0],
          y: item[1],
        }
      }),
    }
  })

  const memoizedData = useMemo(() => data, [data])

  const colors = data.map((item) => item.color)
  colors[selectedScene] = colors[selectedScene].replace(lineOpacity, "1")

  const yAxisLabel = (value) => {
    if (value % 2 === 0) {
      return ""
    }
    return value + ":00"
  }

  return (
    <ResponsiveLine
      data={memoizedData}
      colors={colors}
      margin={{ top: 0, right: 15, bottom: 25, left: 40 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Some description for scene histogram chart",
        legendOffset: 10,
        legendPosition: "middle",
      }}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -15,
        legendPosition: "middle",
        format: (value) => yAxisLabel(value),
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Visit Count",
        legendOffset: 10,
        legendPosition: "middle",
      }}
      pointSize={10}
      // colors={{ scheme: "set1" }}
      // pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      // pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      curve="basis"
      enablePoints={false}
      theme={{
        textColor: useColorModeValue("gray.800", "white"),
        grid: {
          line: {
            stroke: "gray",
            opacity: 0.2,
            strokeDasharray: "1 1",
          },
        },
      }}
      enableArea={true}
      areaOpacity={0.9}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "right-to-left",
          itemWidth: 100,
          itemHeight: 24,
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          itemTextColor: useColorModeValue("#000", "#fff"),
        },
      ]}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <Box
            p="2"
            boxShadow="md"
            borderRadius="md"
            sx={{ backdropFilter: "blur(10px)" }}
            color={useColorModeValue("black", "white")}
          >
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Scene</Th>
                    <Th isNumeric>Count</Th>
                  </Tr>
                </Thead>

                {slice.points.map((point, i) => (
                  <>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Box
                            boxSize="12px"
                            bg={point.serieColor}
                            display="inline-block"
                            mr="2"
                            borderRadius="md"
                          />
                          {point.serieId}
                        </Td>
                        <Td isNumeric>
                          <Text as="kbd">
                            <b>{Number(point.data.yFormatted)}</b>
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </>
                ))}
              </Table>
            </TableContainer>
          </Box>
        )
      }}
    />
  )
}

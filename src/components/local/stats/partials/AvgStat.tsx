/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react"
import CountUp from "react-countup"

const AvgStat = ({ avgData, data, color, line, setLine }) => {
  if (typeof avgData === "number") {
    avgData = [
      {
        id: "Average Value",
        value: avgData,
      },
    ]
  }

  const dateStr = (val) => {
    if (typeof val === "number") {
      return val
    } else {
      return val.length
    }
  }

  const tooltipStr = (id: string, data: number) => {
    if (
      id === "Total Volume of Mana" ||
      id === "Total Rentals" ||
      id === "Average Value"
    ) {
      return `${id} for ${dateStr(data)} days`
    }
    return `${id} average for ${dateStr(data)} days`
  }

  const orderIndex = (val) => {
    if (val === 1) {
      return 2
    } else if (val === 2) {
      return 1
    } else {
      return val
    }
  }

  return (
    <Box>
      <Box>
        <Flex>
          {typeof avgData === "object" &&
            avgData.map((item, i) => {
              return (
                <Box
                  key={item.id}
                  w="100%"
                  minW={[0, 0, 100, 100]}
                  ml="2"
                  color="gray.500"
                  fontSize="sm"
                >
                  <Flex direction="column">
                    <Tooltip
                      p="2"
                      fontSize="sm"
                      borderRadius="xl"
                      label={tooltipStr(item.id, data)}
                      placement="top"
                    >
                      <Box
                        mr="2"
                        color={color[i]}
                        fontSize={["xl", "xl", "2xl", "2xl"]}
                        fontWeight="bold"
                        textAlign={["start", "start", "end", "end"]}
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          if (Object.keys(line).length - 1 !== i)
                            setLine({
                              ...line,
                              [i]: !line[i],
                            })
                        }}
                      >
                        <CountUp end={item.value} duration={0.5} />
                      </Box>
                    </Tooltip>
                    <Box
                      minW={[0, 0, "auto", 140]}
                      mr="2"
                      textAlign={["start", "start", "end", "end"]}
                    >
                      <Text
                        display="inline-block"
                        fontSize={[10, "sm"]}
                        noOfLines={1}
                      >
                        {item.id}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Box>
  )
}

export default AvgStat

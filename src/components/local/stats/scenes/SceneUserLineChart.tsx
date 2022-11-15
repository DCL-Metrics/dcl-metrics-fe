import { useState } from "react"
import { GridItem, useColorModeValue } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
import tempUser from "../../../../../public/data/temp_user.json"

const SceneUserLineChart = ({ data }) => {
  // const userData = tempUser && Object.entries(tempUser.daily_users)
  const userData = data.daily_users && Object.entries(data.daily_users)
  const chartData = []
  userData.map((item) => {
    chartData.push({
      date: item[0],
      users: item[1],
    })
  })
  const color = "rgba(80, 150, 123)"
  const result = [
    {
      id: "Unique Users",
      color: "hsl(90, 70%, 50%)",
      data: chartData.map((item) => ({
        x: item.date,
        y: item.users,
      })),
    },
  ]
  return (
    <GridItem
      w="100%"
      h="350"
      p="2"
      bg={useColorModeValue("gray.100", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <LineChart data={result} color={color} />
    </GridItem>
  )
}

export default SceneUserLineChart

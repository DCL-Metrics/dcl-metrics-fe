import type { NextPage } from "next"
import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import BarChartComponent from "../src/components/chart/BarChartComponent"
import PieChartComponent from "../src/components/chart/PieChartComponent"

const GlobalPage: NextPage = () => {
  const box = {
    h: "450",
    w: "100%",
    bg: "white",
  }

  const gridColumn = useBreakpointValue({ sm: 1, lg: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <BarChartComponent />
        <PieChartComponent />
        <GridItem h={box.h} bg={box.bg} borderRadius="md" boxShadow="md" />
        <GridItem h={box.h} bg={box.bg} borderRadius="md" boxShadow="md" />
        <GridItem h={box.h} bg={box.bg} borderRadius="md" boxShadow="md" />
      </Grid>
    </Layout>
  )
}

export default GlobalPage

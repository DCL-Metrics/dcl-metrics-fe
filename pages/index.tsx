/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import LandPicker from "../src/components/global/map/LandPicker"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
import LandSales from "../src/components/local/stats/rentals/LandSales"
import OnlineUsers from "../src/components/local/ext-data/OnlineUsers"
import {
  fetchGlobalData,
  fetchRentalData,
  getLatestPost,
} from "../src/lib/data/fetch"
import RentalDay from "../src/components/local/stats/rentals/RentalDay"
import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"
import ActiveUsers from "../src/components/local/ext-data/ActiveUsers"
import TopPick from "../src/components/local/ext-data/TopPick"
import { useAtom } from "jotai"
import { psaAtom } from "../src/lib/state/psaState"
import { NextSeo } from "next-seo"
import Head from "next/head"

export async function getStaticProps() {
  const globalData = await fetchGlobalData()
  const rentalData = await fetchRentalData()
  const latestPost = getLatestPost()

  return {
    props: {
      ...globalData,
      rental: rentalData,
      latestPost: latestPost,
    },
  }
}

const GlobalPage: NextPage = (props: Props) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  const {
    globalDailyRes,
    parcelRes,
    landSalesRes,
    topPickRes,
    rental,
    latestPost,
  } = props

  // eslint-disable-next-line no-unused-vars
  const [psa, setPSA] = useAtom(psaAtom)

  useEffect(() => {
    setPSA(latestPost)
  }, [])

  return (
    <Layout>
      {/*<NextSeo
        title="DCL-Metrics"
        description="We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
        openGraph={{
          url: "https://dcl-metrics.com",
          title: "DCL-Metrics",
          description:
            "We make Decentraland's data accessible so it can be used by the community to build a better metaverse.",
          images: [
            {
              url: "https://picsum.photos/400",
              width: 400,
              height: 400,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
        }}
      />*/}
      <Head>
        <meta property="og:title" content="DCL-Metrics" />
        <meta
          property="og:description"
          content="We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
        />
        <meta property="og:image" content="https://picsum.photos/400" />
        <meta property="og:url" content="https://dcl-metrics.com" />
      </Head>
      <Box w="100%">
        <Box mb="4" data-testid="uniqueVisitors">
          <UniqueVisitors data={globalDailyRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitedParcels data={globalDailyRes} />
          <ActiveScenes data={globalDailyRes} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <OnlineUsers />
          <ActiveUsers />
        </Grid>
        <LandPicker parcelData={parcelRes} isPage={false} />
        <Box mb="4">
          <LandSales data={landSalesRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <RentalDay data={rental} />
          <RentalTotal data={rental} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopPick data={topPickRes} />
        </Grid>
      </Box>
    </Layout>
  )
}

export default GlobalPage

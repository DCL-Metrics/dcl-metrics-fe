import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import Explorer from "../src/components/local/stats/Explorer"
import MarathonUsers from "../src/components/local/stats/MarathonUsers"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"
import { writeFile, getDataWithProxy, getData } from "../src/lib/data/fetch"
import {
  time,
  isProd,
  isDev,
  isLocal,
  url,
  sceneURL,
  parcelURL,
} from "../src/lib/data/constant"

export async function getStaticProps() {
  // TODO refactor point
  if (isProd) {
    const response = await axios
      .get(url, {
        method: "get",
        proxy: {
          protocol: "http",
          host: process.env.FIXIE_HOST,
          port: 80,
          auth: {
            username: "fixie",
            password: process.env.FIXIE_TOKEN,
          },
        },
      })
      .catch((error) => {
        console.log(error)
        return { props: { data: staticGlobal }, revalidate: time }
      })

    if (response.status !== 200) {
      sendNotification(response, "global", "error")
    }

    const data = response.data
    return {
      props: { data },
      revalidate: time,
    }

    // staging endpoint
  } else if (
    process.env.NEXT_PUBLIC_STAGING === "true" &&
    process.env.LOCAL !== "true"
  ) {
    const response = await fetch(url)
    const data = await response.json()

    if (response.status !== 200) {
      sendNotification(response, "global", "error")
      return {
        props: { data: staticGlobal },
        revalidate: time,
      }
    }
    return {
      props: { data },
      revalidate: time,
    }
    // use static data
  } else {
    const data = staticGlobal
    return {
      props: { data },
      revalidate: time,
    }
  }
}

const Users = (props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [isDataLoading] = useAtom(LoadingStateAtom)
  // const [data] = useAtom(DataAtom)
  // const result = data.length !== 0 ? data : staticGlobal
  const result = props.data

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <MarathonUsers res={result.users} />
        <Explorer res={result.users} />
      </Grid>
    </Layout>
  )
}

export default Users

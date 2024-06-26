/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SceneMap from "./partials/scene/SceneMap"
import SceneLineChart from "./partials/scene/SceneLineChart"
import SceneSelector from "./partials/scene/SceneSelector"
import StatBox from "./partials/scene/SceneStatBox"
import SceneParcelsHeatmap from "./partials/scene/SceneParcelsHeatmap"
import SceneBarChart from "./partials/scene/SceneBarChart"
import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"
import { format, parseISO } from "date-fns"
import SceneTitle from "../../layout/local/SceneTitle"
import { SceneUserLineChart } from "./scenes/SceneUserLineChart"

const Scene = ({ res, date, setDate, availableDate, dailyUsers, uuid }) => {
  const [selectedScene, setSelectedScene] = useState(0)
  const {
    map_url,
    name,
    marathon_users,
    parcels_heatmap,
    visitors_by_hour_histogram,
  } = res[selectedScene]

  const hasMultipleScenes = res.length > 1
  const [isEmpty, setIsEmpty] = useState(false)
  const latest = parseISO(res[selectedScene].date)

  const secondRowHeight = useBreakpointValue([200, 300, 350, 500])

  const EmptyScene = () => {
    return (
      <Center
        h={["100px", "300px", "450px"]}
        bg={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <Text m="4" fontSize={["md", "xl", "2xl", "3xl"]}>
          {name} had no visitors on {format(new Date(date), "MMMM d")}!
        </Text>
      </Center>
    )
  }

  useEffect(() => {
    const visitorValue = res[selectedScene].visitors
    if (visitorValue === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [res])

  return (
    <Box overflow="hidden">
      <SceneTitle
        name={name}
        date={latest}
        dateForPicker={date}
        setDate={setDate}
        availableDate={availableDate}
        hasMultipleScenes={hasMultipleScenes}
        uuid={uuid}
        description={`Last update ${latest}`}
      />
      {dailyUsers.length > 0 && <SceneUserLineChart data={dailyUsers} />}
      <Box m="0">
        <Flex
          sx={{
            "& > * + *": {
              ml: [0, 0, 0, 4],
              mt: [4, 4, 4, 0],
            },
          }}
          direction={["column", "column", "column", "row"]}
          w="100%"
          h="auto"
          mb="4"
        >
          <Box w={["100%", "100%", "100%", "35%"]}>
            {hasMultipleScenes && (
              <SceneSelector
                res={res}
                name={name}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            )}
            <SceneMap
              url={map_url}
              height={!hasMultipleScenes ? secondRowHeight : 405}
              name={name}
            />
          </Box>
          <Box
            w={["100%", "100%", "100%", "65%"]}
            h={["100%", "100%", "100%", `${secondRowHeight}px`]}
            mt={[4, 4, 4, 0]}
          >
            {isEmpty && <EmptyScene />}
            {!isEmpty && (
              <StatBox
                data={res[selectedScene]}
                selectedScene={selectedScene}
                date={res[selectedScene].date}
              />
            )}
          </Box>
        </Flex>
        <Flex
          sx={{
            "& > * + *": {
              ml: [0, 0, 0, 4],
              mt: [4, 4, 4, 0],
            },
          }}
          direction={["column", "column", "column", "row"]}
          w="100%"
          h="auto"
          mb="4"
        >
          <Box w={["100%", "100%", "100%", "35%"]}>
            {!isEmpty && (
              <SceneParcelsHeatmap
                data={parcels_heatmap}
                selectedScene={selectedScene}
              />
            )}
          </Box>
          <Box w={["100%", "100%", "100%", "65%"]} h="435px" mt={[4, 4, 0]}>
            {!isEmpty && <SceneLineChart data={res} />}
          </Box>
        </Flex>
        <Flex
          sx={{
            "& > * + *": {
              ml: [0, 0, 0, 4],
              mt: [4, 4, 4, 0],
            },
          }}
          direction={["column", "column", "column", "row"]}
          w="100%"
          h="auto"
        >
          {process.env.NEXT_PUBLIC_ALLOW_USER === "true" && (
            <Box w={["100%", "100%", "100%", "50%"]} h="520" mt={[4, 4, 8, 0]}>
              {!isEmpty && <SceneMarathonUsers data={marathon_users} />}
            </Box>
          )}
          <Box
            w={[
              "100%",
              "100%",
              "100%",
              process.env.NEXT_PUBLIC_ALLOW_USER === "true" ? "50%" : "100%",
            ]}
            //h="300px"
            mb={[4, 4, 4, 0]}
          >
            {!isEmpty && (
              <SceneBarChart
                visitors_by_hour_histogram={visitors_by_hour_histogram}
              />
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Scene

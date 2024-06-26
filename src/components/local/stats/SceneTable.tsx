import { Box } from "@chakra-ui/react"
import ScenePageTable from "./partials/scene/table/ScenePageTable"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import { sub, format } from "date-fns"

const SceneTable = ({ sceneRes }) => {
  const yesterday = format(
    sub(new Date(sceneRes[0].date), { days: 1 }),
    "yyyy MMMM d"
  )
  return (
    <BoxWrapper colSpan={6}>
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        overflowY="auto"
        pb="4"
      >
        <BoxTitle
          name="Top 50 Scenes"
          date=""
          avgData=""
          slicedData=""
          color=""
          description={`The busiest top scenes on ${yesterday}`}
          line={undefined}
          setLine={undefined}
        />
        <ScenePageTable sceneRes={sceneRes} />
      </Box>
    </BoxWrapper>
  )
}

export default SceneTable

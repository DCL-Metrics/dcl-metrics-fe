import { Box } from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const Description = ({ event }) => {
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`Event Description`}
        description="Desription for the latest event"
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box h="auto" m="4">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          // eslint-disable-next-line react/no-children-prop
          children={event.description}
          skipHtml
        />
      </Box>
    </BoxWrapper>
  )
}

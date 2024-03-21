import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { EventRelatedEvent } from "./EventRelatedScene"

export const AdditionalData = ({ eventData }) => {
  const { occurrences } = eventData
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`Event Overview`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <EventRelatedEvent data={occurrences} />
    </BoxWrapper>
  )
}

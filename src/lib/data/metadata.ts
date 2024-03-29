import { isProd } from "./constant"

export const siteUrl = isProd
  ? "https://dcl-metrics.com"
  : "https://dcl-metrics-fe-stage.herokuapp.com"

const defaultMetadata = {
  title: "DCL-Metrics",
  description:
    "We make Decentraland's data accessible so it can be used by the community to build a better metaverse.",
  image: `${siteUrl}/images/background.png`,
}

export const generateMetaData = (options) => {
  const { title, description, image } = options
  const metadata = {
    title: title || defaultMetadata.title,
    description: description || defaultMetadata.description,
    image: image || defaultMetadata.image,
  }

  return metadata
}

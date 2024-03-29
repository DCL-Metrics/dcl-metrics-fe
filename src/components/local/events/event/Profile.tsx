import { Center, Avatar, Text, WrapItem, Box } from "@chakra-ui/react"
import Link from "next/link"
import useSWR from "swr"

export const Profile = ({ id }) => {
  const endpoint = `https://peer-ap1.decentraland.org/lambdas/profiles?id=${id}`
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data } = useSWR(endpoint, fetcher)

  const { name, avatar } =
    data && data.length > 0 ? data[0].avatars[0] : "no data"
  const profileImage = avatar?.snapshots?.face256

  return (
    <WrapItem
      overflow="hidden"
      maxW="90px"
      _hover={{
        transform: "scale(1.02)",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      }}
    >
      <Center w="100%" h="100%">
        <Link href={`/users/${id}`} target="_blank">
          <Center overflow="hidden" w="auto" h="auto">
            <Avatar size={["md", "lg"]} src={profileImage} />
          </Center>
          <Box>
            <Text
              fontSize="xs"
              fontWeight="medium"
              textAlign="center"
              noOfLines={1}
            >
              {name ? name : "N/A"}
            </Text>
          </Box>
        </Link>
      </Center>
    </WrapItem>
  )
}

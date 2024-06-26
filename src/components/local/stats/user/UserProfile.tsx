import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Text, Center, Flex, Image, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const UserProfile = ({ data }) => {
  const { name, address } = data
  const [profileImage, setProfileImage] = useState("")

  const url = `https://peer-ec1.decentraland.org/lambdas/profiles/${address}`

  const fetchUserPicture = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      const image = data.avatars[0].avatar.snapshots.face256
      setProfileImage(image)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  useEffect(() => {
    fetchUserPicture()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BoxWrapper colSpan={[1, 1, 1, 6, 6]}>
      <Flex
        direction={["column", "column", "column", "row"]}
        mb={[-4, 0, 0, 0, 0]}
      >
        <Center
          w={["auto", "auto", "auto", "100%", "100%"]}
          m={[4, 4, 4, 2, 2]}
          bg={useColorModeValue(
            "linear-gradient(322deg, rgba(250,146,248,1) 0%, rgba(145,198,252,1) 49%, rgba(241,246,252,1) 100%)",
            "linear-gradient(322deg, rgba(70,20,69,1) 0%, rgba(38,80,124,1) 49%, rgba(69,71,73,1) 100%)"
          )}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderRadius="xl"
          shadow="md"
        >
          <Flex
            direction={["column", "row"]}
            overflow="hidden"
            m="4"
            bg={useColorModeValue("gray.400", "gray.600")}
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="full"
          >
            <Image
              sx={{ filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.5))" }}
              h="100"
              shadow="xl"
              alt={name}
              fallbackSrc="/images/blank_profile.png"
              src={profileImage}
            />
          </Flex>
          <Center display={["none", "block"]} mt="2">
            <Text
              fontSize={["xl", "2xl", "4xl", "6xl", "8xl"]}
              fontWeight="bold"
            >
              {name}
            </Text>
          </Center>
          <Center display={["flex", "none"]}>
            <Text fontSize="xl" fontWeight="bold">
              {name}
            </Text>
          </Center>
        </Center>
      </Flex>
    </BoxWrapper>
  )
}

export default UserProfile

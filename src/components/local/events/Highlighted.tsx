/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Center,
  Button,
  ButtonGroup,
  Spacer,
  Link,
  IconButton,
  Tag,
} from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import { useSpringCarousel } from "react-spring-carousel"
import {
  FiArrowLeft,
  FiArrowRight,
  FiAtSign,
  FiCalendar,
  FiHome,
  FiTag,
  FiUser,
} from "react-icons/fi"
import { format } from "date-fns"
import ToolTip from "../../layout/local/ToolTip"
import BoxTitle from "../../layout/local/BoxTitle"
import { tagColor } from "../../../lib/data/constant"

export const HighlightedEvents = ({ highlighted }) => {
  const EventDetail = ({ icon, text }) => (
    <Flex align="center" direction="row" mb="2" mx="2">
      {icon}
      <Text ml="2" fontWeight="medium">
        {text}
      </Text>
    </Flex>
  )

  const createCarouselItems = (highlighted) => {
    return highlighted.map((event) => {
      return {
        id: event.id,
        renderItem: (
          <Flex direction={["column", "row"]} gap="4" w="100%" pr="6">
            <Box w={["100%", "70%"]} h="100%">
              <Box
                overflow="hidden"
                h="100%"
                border="1px solid"
                borderColor={useColorModeValue("gray.300", "gray.600")}
                borderRadius="xl"
                shadow="md"
              >
                <Image
                  sx={{ cursor: "pointer" }}
                  h={["100%"]}
                  userSelect="none"
                  objectFit="cover"
                  alt={event.name}
                  src={event.image}
                />
              </Box>
            </Box>
            <Box w={["100%", "30%"]} h="100%">
              <Flex
                direction="column"
                h="100%"
                p="4"
                fontSize="sm"
                bg={useColorModeValue("gray.200", "gray.700")}
                border="1px solid"
                borderColor={useColorModeValue("gray.300", "gray.600")}
                borderRadius="xl"
                shadow="md"
              >
                <Box>
                  <Link href={`/events/${event.id}`} target="_blank">
                    <Text
                      mb="2"
                      color="blue.400"
                      fontSize={["md", "xl", "2xl"]}
                      fontWeight="black"
                      _hover={{ color: "blue.600" }}
                      noOfLines={4}
                    >
                      {event.name}
                    </Text>
                  </Link>
                </Box>
                <Spacer />
                <Box>
                  <EventDetail
                    icon={<FiCalendar />}
                    text={format(new Date(event.start_at), "yyyy MMMM d")}
                  />
                  <EventDetail
                    icon={<FiAtSign />}
                    text={event.scene_name || "N/A"}
                  />
                  <EventDetail
                    icon={<FiTag />}
                    text={
                      <Tag
                        fontSize="xs"
                        shadow="sm"
                        _hover={{ cursor: "pointer" }}
                        colorScheme={tagColor[event.categories[0]]}
                      >
                        {event.categories[0]?.toUpperCase() || "N/A"}
                      </Tag>
                    }
                  />
                  <Flex align="center" direction="row" mb="2" mx="2">
                    <FiUser />

                    <Text ml="2" fontWeight="medium">
                      Organized by
                      <Link href={`/users/${event.user}`}>
                        <Text
                          as="span"
                          ml="1"
                          color="blue.400"
                          fontWeight="bold"
                          _hover={{ color: "blue.600" }}
                        >
                          {event.user_name}
                        </Text>
                      </Link>
                    </Text>
                  </Flex>
                  <EventDetail
                    icon={<FiHome />}
                    text={
                      <ToolTip label={`Jump in [${event.x}, ${event.y}]`}>
                        <Link href={event.url} target="_blank">
                          <Button
                            borderRadius="md"
                            shadow="sm"
                            colorScheme="purple"
                            size="xs"
                          >
                            {event.x}, {event.y}
                          </Button>
                        </Link>
                      </ToolTip>
                    }
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        ),
      }
    })
  }

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      withLoop: true,
      items: createCarouselItems(highlighted),
    })

  return (
    <BoxWrapper colSpan="8">
      <BoxTitle
        name="Highlighted Event"
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Flex pos="relative" direction="column">
        <Box m="4" mt="0">
          {" "}
          {carouselFragment}
        </Box>
        <Center
          pos="absolute"
          top="50%"
          left="50%"
          w="100%"
          transform="translate(-50%, -50%)"
        >
          <ButtonGroup w="100%">
            <IconButton
              zIndex="banner"
              fontSize="14px"
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              shadow="md"
              aria-label="prev"
              icon={<FiArrowLeft />}
              isRound={true}
              onClick={slideToPrevItem}
              size="sm"
              variant="solid"
            />
            <Spacer />
            <IconButton
              zIndex="banner"
              fontSize="14px"
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              shadow="md"
              aria-label="next"
              icon={<FiArrowRight />}
              isRound={true}
              onClick={slideToNextItem}
              size="sm"
              variant="solid"
            />
          </ButtonGroup>
        </Center>
      </Flex>
    </BoxWrapper>
  )
}

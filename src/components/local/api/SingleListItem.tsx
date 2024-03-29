/* eslint-disable react-hooks/rules-of-hooks */
import { ListItem, useColorModeValue, Text } from "@chakra-ui/react"
import Link from "next/link"

const SingleListItem = ({
  item,
  itemIndex,
  setItemIndex,
  setSelectedItem,
  i,
}) => {
  return (
    <Link
      href={`/docs/${item.data.category}/${item.data.title}`}
      key={item.data.title}
      scroll={false}
    >
      <ListItem
        key={item.data.title}
        w="100%"
        mb="2"
        px="4"
        py="2"
        bg={itemIndex === i && useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        _hover={{
          bg: useColorModeValue("gray.200", "gray.600"),
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectedItem(item)
          setItemIndex(i)
        }}
      >
        <Text fontSize="md" fontWeight="semibold">
          {item.data.title.charAt(0).toUpperCase() + item.data.title.slice(1)}
        </Text>
        <Text as="kbd" fontSize="sm">
          {item.data.description}
        </Text>
      </ListItem>
    </Link>
  )
}

export default SingleListItem

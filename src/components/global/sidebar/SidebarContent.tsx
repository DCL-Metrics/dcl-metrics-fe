import {
  Box,
  Tooltip,
  useColorModeValue,
  Flex,
  HStack,
  CloseButton,
  Spacer,
  Text,
  BoxProps,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { sidebarList } from "../sidebarList"
import NavItem from "./NavItem"

interface SidebarProps extends BoxProps {
  onClose: () => void
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
  sidebarStatus: string
  handleSidebar: () => void
  isOpen: boolean
}

const SidebarContent = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarStatus,
  handleSidebar,
  isOpen,
  onClose,
  ...rest
}: SidebarProps) => {
  const router = useRouter()

  const SidebarItem = ({ label, name, icon, subItem }) => {
    return (
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="xl"
        label={label}
        placement="right"
      >
        <Box ml={sidebarOpen && subItem && "4"}>
          <Link href={"/" + name} passHref legacyBehavior>
            <a>
              <NavItem
                height="3rem"
                shadow={router.pathname === "/" + name && "md"}
                icon={icon}
                bg={
                  router.pathname === "/" + name && // eslint-disable-next-line
                  useColorModeValue("gray.200", "gray.700")
                }
                overflow="hidden"
              >
                {/* @ts-ignore */}
                <Text as={router.pathname === "/" + name && "u"} fontSize="lg">
                  {name
                    ? name.charAt(0).toUpperCase() + name.slice(1)
                    : "Global"}
                </Text>
              </NavItem>
            </a>
          </Link>
        </Box>
      </Tooltip>
    )
  }

  return (
    <Box
      pos="fixed"
      w={{ base: "full", md: sidebarStatus }}
      h="full"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      transition=".25s ease"
      {...rest}
      overflow="clip"
    >
      <Flex
        align="center"
        justify="space-between"
        h="20"
        ml="4"
        cursor="pointer"
      >
        <Link href="/" passHref legacyBehavior>
          <HStack>
            <Box sx={{ transform: "translateY(-3px)" }} shadow="md">
              <Image
                width="26"
                height="26"
                alt="logo"
                src={"/images/logo.png"}
              />
            </Box>
            <Text
              fontSize="18px"
              fontWeight="bold"
              wordBreak="keep-all"
              css={{ transform: "translateY(-1px)" }}
              data-testid="sidebar-title"
            >
              {sidebarOpen && "DCL Metrics"}
            </Text>
          </HStack>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction="column" gap="1" h="calc(100vh - 6rem)">
        {Object.keys(sidebarList).map((item) => (
          <SidebarItem
            key={item}
            label={sidebarList[item].label}
            name={sidebarList[item].name}
            icon={sidebarList[item].icon}
            subItem={sidebarList[item].subItem}
          />
        ))}
        <Spacer />
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label={sidebarOpen ? "Collapse" : "Expand"}
          placement="right"
        >
          <Box display={{ base: "none", md: "block" }}>
            <NavItem
              height="3rem"
              icon={sidebarOpen ? FiArrowLeftCircle : FiArrowRightCircle}
              onClick={handleSidebar}
              overflow="hidden"
            >
              <Text fontSize="xl">Collapse</Text>
            </NavItem>
          </Box>
        </Tooltip>
      </Flex>
    </Box>
  )
}

export default SidebarContent
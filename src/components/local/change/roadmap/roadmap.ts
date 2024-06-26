import {
  FiGift,
  FiSliders,
  FiTruck,
  FiUserPlus,
} from "react-icons/fi"

export const roadmap = [
  {
    date: "2024 Q3",
    contents: [
      {
        icon: FiTruck,
        title: "Land/Scene utilization for detailed metrics",
        //description: "",
      },
    ],
  },
  {
    date: "2024 Q4",
    contents: [
      {
        icon: FiUserPlus,
        title: "Atlas Corp historical user data integration",
        //description: "",
      },
      {
        icon: FiSliders,
        title: "Retention Metrics for scenes",
        //description: "",
      },
      
    ],
  },
  {
    date: "2025+",
    contents: [
      {
        icon: FiGift,
        title:
          "Long-term maintenance and internal features leading to API accessibility",
        description:
          "Data consistency & technical debt tasks will be split across the whole roadmap",
      },
    ],
  },
]

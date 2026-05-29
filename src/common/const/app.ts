import logo from "@/assets/images/favicon.png"
import { HomeIcon, UsersRoundIcon, type LucideIcon } from "lucide-react"

export type MenuItem = {
  label: string
  to: string
  icon?: LucideIcon
  items?: MenuItem[]
  permission?: string
  description?: string
  itemsClassName?: string
}

export type MenuItems = MenuItem[]

export const app = {
  logo,
  name: "True Match",
  description: "Admin Console for True Match App",
}

export const menus = [
  {
    label: "dashboard",
    to: "/d",
    icon: HomeIcon,
  },
  // {
  //   label: "customers",
  //   to: "/d/customers",
  //   icon: UserStarIcon,
  // },
  // {
  //   label: "merchants",
  //   to: "/d/merchants",
  //   icon: StoreIcon,
  // },
  {
    label: "users",
    to: "/d/users",
    icon: UsersRoundIcon,
  },
  // {
  //   label: "categories",
  //   to: "/d/categories",
  //   icon: LayersIcon,
  // },
  // {
  //   label: "tags",
  //   to: "/d/tags",
  //   icon: TagIcon,
  // },
  // {
  //   label: "users",
  //   to: "/d/users",
  //   icon: UsersRoundIcon,
  // },
]

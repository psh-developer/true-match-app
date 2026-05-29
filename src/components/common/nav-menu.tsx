"use client"

import { cn } from "@/common/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router"

export function NavMenu() {
  return (
    <div
      className={cn(
        "sticky top-4 z-50 m-4 rounded-full border bg-secondary p-2 px-8",
        "flex items-center justify-between"
      )}
    >
      <div>Shadcn</div>
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link to="/">Home</Link>}
            ></NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link to="/konva">Konva</Link>}
            ></NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link to="/form-example">Form Example</Link>}
            ></NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div />
    </div>
  )
}

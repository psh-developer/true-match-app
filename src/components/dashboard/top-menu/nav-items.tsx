"use client";

import { menus, type MenuItem } from "@/common/const/app";
import { cn } from "@/common/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { Link, useMatch } from "react-router";

function MenuItem({ menu }: { menu: MenuItem }) {
  const match = useMatch(menu.to === "/d" ? menu.to : `${menu.to}/*`);

  if (!menu.items && menu.to)
    return (
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), match && "bg-secondary")}
        render={<Link to={menu.to}>{menu.label}</Link>}
      />
    );

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul> */}
        <ul className={cn("min-w-48", menu?.itemsClassName)}>
          {menu.items?.map((item) => (
            <ListItem key={item.label} to={item.to} title={item.label}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function NavMenuItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {menus?.map((menu: MenuItem) => (
          <MenuItem key={menu.label} menu={menu} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link to={to}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

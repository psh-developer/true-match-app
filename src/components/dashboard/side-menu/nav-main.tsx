import { menus, type MenuItem } from "@/common/const/app"
import { cn } from "@/common/lib/utils"
import { useLanguageStore } from "@/common/stores/i18n"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useMatch } from "react-router"

export function NavMain() {
  const { t } = useTranslation()
  return (
    <SidebarContent className="flex flex-row justify-between">
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {menus.map((item) => (
              <NavItem {...item} key={t(item.label, { ns: "common" })} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

function NavItem(item: MenuItem) {
  const { t } = useTranslation()
  const match = useMatch(item.to === "/d" ? item.to : `${item.to}/*`)
  const lang = useLanguageStore((state) => state.lang)

  if (item.items && item.items.length > 0) return <NavItemGroup {...item} />
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          "text-ellipsis",
          lang === "my" ? "text-[13px]" : "text-sm",
          match &&
            "min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        )}
        render={
          <Link viewTransition to={item.to || "#"}>
            {item.icon && <item.icon className="size-3" />}
            <span>{t(item.label, { ns: "common" })}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  )
}

function NavItemGroup(item: MenuItem) {
  const { t } = useTranslation()
  const lang = useLanguageStore((state) => state.lang)

  return (
    <Collapsible key={item.label} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton
              tooltip={t(item.label, { ns: "common" })}
              className={cn(lang === "my" ? "text-[13px]" : "text-sm")}
            >
              {item.icon && <item.icon className="size-3" />}
              <span>{t(item.label, { ns: "common" })}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <NavSubItem key={subItem.to} {...subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function NavSubItem(item: MenuItem) {
  const { t } = useTranslation()
  const lang = useLanguageStore((state) => state.lang)
  const match = useMatch(item.to === "/d" ? item.to : `${item.to}/*`)

  if (item.items && item.items.length > 0) return <NavItemGroup {...item} />
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        className={cn(
          lang === "my" ? "text-[13px]" : "text-sm",
          match &&
            "min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        )}
        render={
          <Link viewTransition to={item.to || "#"}>
            <span>{t(item.label, { ns: "common" })}</span>
          </Link>
        }
      />
    </SidebarMenuSubItem>
  )
}

import { menus, type MenuItem } from "@/common/const/app"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

export function NavSecondary() {
  const { t } = useTranslation()
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {menus.map((item: MenuItem) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton>
                <Link viewTransition to={item?.to || ""}>
                  {item.icon && <item.icon />}
                  <span>{t(item.label, { ns: "common" })}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

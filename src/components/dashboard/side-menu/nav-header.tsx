import { cn } from "@/common/lib/utils"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Logo } from "../common/logo"

export function NavHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuButton
          size="lg"
          className={cn(
            "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          )}
          render={<Logo showTitle showDescription />}
        />
      </SidebarMenu>
    </SidebarHeader>
  )
}

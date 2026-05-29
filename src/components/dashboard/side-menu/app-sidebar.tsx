import { useConfigStore } from "@/common/stores/config"
import { Sidebar, SidebarRail } from "@/components/ui/sidebar"
import * as React from "react"
import { NavFallback } from "./nav-fallback"
import { NavFooter } from "./nav-footer"
import { NavHeader } from "./nav-header"
import { NavMain } from "./nav-main"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  loading?: boolean
}

export function AppSidebar({ loading, ...props }: AppSidebarProps) {
  const config = useConfigStore((state) => state.config)
  return (
    <Sidebar
      variant={config.variant}
      collapsible={config.collapsible}
      {...props}
    >
      <NavHeader />
      {loading ? (
        <NavFallback />
      ) : (
        <>
          <NavMain />
          <NavFooter />
          <SidebarRail />
        </>
      )}
    </Sidebar>
  )
}

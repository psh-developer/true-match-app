import { LanguageSwitch } from "@/components/common/language-switch"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { EnhancedBreadcrumb } from "./common/breadcrumb"
import { AppSidebar } from "./side-menu/app-sidebar"

// function LayoutLoader() {
//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <LoaderIcon
//         role="status"
//         aria-label="Loading"
//         className="size-6 animate-spin"
//       />
//     </div>
//   )
// }

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      {/* <AppSidebar loading={loading} /> */}
      <AppSidebar />
      <SidebarInset className="m-0 overflow-hidden p-0">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger className="-ml-1" />{" "}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <EnhancedBreadcrumb />
          </div>
          {/* <ThemeToggle /> */}
          <LanguageSwitch />
        </header>
        {/* {loading ? <LayoutLoader /> : isError ? <ErrorPage /> : <Outlet />} */}
        {/* <LayoutLoader /> */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

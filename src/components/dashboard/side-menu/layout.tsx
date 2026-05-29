// import { useProfile } from "@/common/hooks/use-profile";
// import { LanguageSwitch } from "@/components/common/language-switch";
import { useProfile } from "@/common/hooks/use-profile";
import { cn } from "@/common/lib/utils";
import { LanguageSwitch } from "@/components/common/language-switch";
import { ErrorPage } from "@/components/pages";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LoaderIcon } from "lucide-react";
import { Outlet } from "react-router";
import { EnhancedBreadcrumb } from "../common/breadcrumb";
import { AppSidebar } from "./app-sidebar";

function LayoutLoader() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="size-6 animate-spin"
      />
    </div>
  );
}

export function SidebarMenuLayout() {
  const { loading, isError } = useProfile();

  return (
    <SidebarProvider>
      <AppSidebar loading={loading} />
      <SidebarInset className="overflow-hidden m-0 p-0 space-y-2">
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className={cn(
                "mr-2",
                // "data-[orientation=vertical]:h-4"
              )}
            />
            <EnhancedBreadcrumb />
          </div>
          <ThemeToggle />
          <LanguageSwitch />
        </header>
        {loading ? <LayoutLoader /> : isError ? <ErrorPage /> : <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  );
}

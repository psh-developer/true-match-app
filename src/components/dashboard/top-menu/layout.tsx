// import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Outlet } from "react-router"
import { EnhancedBreadcrumb } from "../common/breadcrumb"
import { Logo } from "../common/logo"
import { ProfileAvatar } from "../common/profile-avatar"
import { NavMenuItems } from "./nav-items"

export function TopMenuLayout() {
  return (
    <div className="relative h-screen w-screen">
      <header className="fixed top-0 z-10 w-full border-b bg-background shadow-sm">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Logo />
          <NavMenuItems />
          <div className="flex gap-2">
            {/* <ThemeToggle /> */}
            <ProfileAvatar />
          </div>
        </nav>
      </header>
      <main className="mx-auto flex h-screen w-screen max-w-7xl flex-col pt-14">
        <div className="p-4">
          <EnhancedBreadcrumb />
        </div>
        <Outlet />
      </main>
    </div>
  )
}

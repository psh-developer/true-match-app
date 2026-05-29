import { NavMenu } from "@/components/common/nav-menu"
import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div>
      <NavMenu />
      <div className="m-8">
        <Outlet />
      </div>
    </div>
  )
}

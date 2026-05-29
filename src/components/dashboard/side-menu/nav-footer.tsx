// import { useAuth } from "@/common/hooks/use-oauth";
// import { getAvatarFallback } from "@/common/lib/utils";
import { useUserStore } from "@/common/stores/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChevronsUpDown } from "lucide-react"
import { ProfileContent } from "../common/profile-content"

export function getAvatarFallback(
  displayName?: string,
  length: number = 2
): string {
  if (!displayName) return ""

  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() || "")

  return initials.join("").slice(0, length)
}

export function NavFooter() {
  const profile = useUserStore((state) => state.user)

  return (
    <SidebarFooter>
      <SidebarMenu>
        <ProfileContent side="right" profile={profile!}>
          <SidebarMenuItem>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage alt={profile?.displayName} />
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                      {getAvatarFallback(profile?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile?.displayName}
                    </span>
                    <span className="truncate text-xs">
                      {profile?.roleName}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              }
            ></DropdownMenuTrigger>
          </SidebarMenuItem>
        </ProfileContent>
      </SidebarMenu>
    </SidebarFooter>
  )
}

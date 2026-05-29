// import { useAuth } from "@/common/hooks/use-oauth";
// import { getAvatarFallback } from "@/common/lib/utils";
import { useLogout } from "@/common/hooks/use-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function getAvatarFallback(
  displayName?: string,
  length: number = 2,
): string {
  if (!displayName) return "";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() || "");

  return initials.join("").slice(0, length);
}

export function ProfileContent({
  profile,
  children,
  align = "end",
  side = "bottom",
}: {
  profile: Profile;
  children: React.JSX.Element;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}) {
  const { t } = useTranslation("message");

  const logout = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => logout();

  const handleSettings = () => navigate("/d/settings");

  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={4}
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <ProfileAvatarItem profile={profile!} />
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSettings}>
            <SettingsIcon />
            {t("settings")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            {t("common:logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileAvatarItem({ profile }: { profile: Profile }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage alt={profile?.displayName} />
        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
          {getAvatarFallback(profile?.displayName)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{profile?.displayName}</span>
        <span className="truncate text-xs"> {profile?.roleName}</span>
      </div>
    </div>
  );
}

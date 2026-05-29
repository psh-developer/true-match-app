import { useUserStore } from "@/common/stores/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProfileContent } from "./profile-content";

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

export function ProfileAvatar() {
  const profile = useUserStore((state) => state.user);

  return (
    <ProfileContent profile={profile!}>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9 rounded-lg">
          <AvatarImage alt={profile?.displayName} />
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
            {getAvatarFallback(profile?.displayName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    </ProfileContent>
  );
}

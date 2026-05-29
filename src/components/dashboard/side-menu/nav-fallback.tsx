import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function NavFallback() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

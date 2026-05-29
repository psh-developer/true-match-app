import { app } from "@/common/const/app"
import { cn } from "@/common/lib/utils"

export function Logo({
  className,
  showTitle,
  showDescription,
}: {
  className?: string
  showTitle?: boolean
  showDescription?: boolean
}) {
  return (
    <div className={cn("item-center flex gap-2", className)}>
      <div
        className={cn(
          "flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
        )}
      >
        <img className="size-full object-contain" src={app.logo} />
      </div>
      {showTitle && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{app.name}</span>
          {showDescription && (
            <span className="truncate text-xs text-muted-foreground">
              {app.description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

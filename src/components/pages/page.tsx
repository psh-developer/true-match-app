import { cn } from "@/common/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface PageProps {
  title?: string
  children?: React.ReactNode
  noSpace?: boolean
  fixHeight?: boolean
  className?: string
}

export function Page({
  children,
  title,
  noSpace,
  fixHeight,
  className,
}: PageProps) {
  return (
    <>
      {title && <title>{title}</title>}
      <div
        className={cn(
          "flex flex-col",
          !noSpace && "p-4 pt-0",
          fixHeight && "h-[calc(100vh-4rem)] overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

interface PageHeaderProps {
  children?: React.ReactNode
  goback?: boolean
  error?: boolean
  loading?: boolean
  title?: string | React.ReactNode
  className?: string
}

export function PageHeader({
  children,
  className,
  title,
  error,
  loading,
  goback,
}: PageHeaderProps) {
  const navigate = useNavigate()

  if (error) return null
  if (loading) return <PageHeaderFallback />
  return (
    <div
      className={cn(
        "mb-4 flex flex-col justify-between gap-2 sm:flex-row",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {goback && (
          <Button
            size="icon"
            variant="outline"
            className="size-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
        )}
        {typeof title === "string" ? (
          <h1 className="text-lg font-semibold">{title}</h1>
        ) : (
          title
        )}
      </div>
      {children}
    </div>
  )
}

function PageHeaderFallback() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Skeleton className="size-8" />
      <Skeleton className="h-8 w-[250px]" />
    </div>
  )
}

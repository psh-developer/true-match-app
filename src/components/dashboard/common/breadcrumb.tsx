import { breadcrumbConfig } from "@/common/const/breadcrumb"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router"

interface BreadcrumbSegment {
  label: string
  path: string
  isLast: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export function EnhancedBreadcrumb() {
  const { t } = useTranslation()
  const location = useLocation()

  const getSegmentConfig = (segment: string) => {
    const config = breadcrumbConfig[segment.toLowerCase()]
    if (config) {
      return config
    }

    return {
      label: segment,
    }
  }

  const generateBreadcrumbs = (): BreadcrumbSegment[] => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment: string) => segment !== "")

    if (pathSegments.length === 0) {
      return []
    }

    const breadcrumbs: BreadcrumbSegment[] = []
    let currentPath = ""

    pathSegments.forEach((segment: string, index: number) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      const config = getSegmentConfig(segment)

      breadcrumbs.push({
        label: config.label,
        path: currentPath,
        isLast,
        icon: config.icon,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <div key={breadcrumb.path} className="flex items-center">
            <BreadcrumbItem>
              {breadcrumb.isLast ? (
                <BreadcrumbPage className="flex items-center gap-1">
                  {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
                  {t(breadcrumb.label, { ns: "common" })}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  render={
                    <Link
                      viewTransition
                      to={breadcrumb.path}
                      className="flex items-center gap-1 transition-colors hover:text-foreground"
                    >
                      {breadcrumb.icon && (
                        <breadcrumb.icon className="h-4 w-4" />
                      )}
                      {t(breadcrumb.label, { ns: "common" })}
                    </Link>
                  }
                />
              )}
            </BreadcrumbItem>
            {!breadcrumb.isLast && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

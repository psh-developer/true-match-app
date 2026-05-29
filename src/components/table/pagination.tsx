"use client"

import { DEFAULT_LIMIT } from "@/common/const/config"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  total?: number
}

export function DataTablePagination<TData>({
  table,
  total = 0,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation("table")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT
  const skip = Number(searchParams.get("offset")) || 0

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const updateSearchParams = (newSkip: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("offset", newSkip.toString())
    if (newLimit) {
      params.set("limit", newLimit.toString())
    }
    navigate(`?${params.toString()}`, { replace: true })
  }

  const handlePageSizeChange = (newLimit: string | null) => {
    const limitNum = Number(newLimit)
    // Reset to first page when changing page size
    updateSearchParams(0, limitNum)
  }

  const goToFirstPage = () => {
    updateSearchParams(0)
  }

  const goToPreviousPage = () => {
    const newSkip = Math.max(0, skip - limit)
    updateSearchParams(newSkip)
  }

  const goToNextPage = () => {
    const newSkip = skip + limit
    if (newSkip < total) {
      updateSearchParams(newSkip)
    }
  }

  const goToLastPage = () => {
    const lastPageSkip = Math.max(0, Math.floor((total - 1) / limit) * limit)
    updateSearchParams(lastPageSkip)
  }

  const canPreviousPage = skip > 0
  const canNextPage = skip + limit < total

  if (!total) return null
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        {t("row-count", {
          current: table.getFilteredRowModel().rows.length,
          total,
        })}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="hidden items-center space-x-2 md:flex">
          <p className="text-sm font-medium">{t("rows-per-page")}</p>
          <Select value={`${limit}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("pagination", { current: currentPage, total: totalPages })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            // className="hidden size-8 md:flex bg-transparent"
            className="size-8 bg-transparent"
            onClick={goToFirstPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 bg-transparent"
            onClick={goToPreviousPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 bg-transparent"
            onClick={goToNextPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            // className="hidden size-8 md:flex bg-transparent"
            className="size-8 bg-transparent"
            onClick={goToLastPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

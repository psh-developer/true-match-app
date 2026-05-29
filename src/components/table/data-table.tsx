import { cn } from "@/common/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnPinningState,
  type InitialTableState,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  LoaderCircleIcon,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { Empty } from "./empty";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "./view-option";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPinningStyles = (column: any): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total?: number;
  error?: boolean;
  loading?: boolean;
  header?: React.ReactNode;
  headerActions?: React.ReactNode;
  hideToolbarItem?: boolean;
  columnPinning?: ColumnPinningState | undefined;
  initialState?: InitialTableState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  loading,
  header,
  headerActions,
  hideToolbarItem,
  initialState,
  columnPinning: defaultColumnPinning,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    defaultColumnPinning || {
      left: [],
      right: ["actions"],
    },
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnPinning,
    },
    initialState: initialState,
    // enableSorting: false,
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    enableSortingRemoval: false,
  });

  useEffect(() => {
    if (sorting.length > 0) {
      searchParams.set(
        "orderby",
        `${sorting[0]?.id}__${sorting[0]?.desc ? "desc" : "asc"}`,
      );
    } else {
      searchParams.delete("orderby");
    }
    setSearchParams(searchParams, { replace: true });
  }, [sorting]);

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-auto relative">
      <div className="flex items-start justify-between gap-2 pt-1">
        {header ? header : <div />}
        <div className="flex items-center gap-2">
          {headerActions}
          {!hideToolbarItem && <DataTableViewOptions table={table} />}
        </div>
      </div>
      <div className="h-full overflow-auto rounded-md border relative">
        <Table className="[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader
          // className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/50 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  const isPinned = column.getIsPinned();
                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right");

                  return (
                    <TableHead
                      key={header.id}
                      className="border-r-0 [&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 relative h-10 truncate data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l"
                      colSpan={header.colSpan}
                      style={{
                        ...getPinningStyles(column),
                      }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                            ? "right"
                            : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between gap-2",
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                        )}
                        // onClick={header.column.getToggleSortingHandler()}
                        // onKeyDown={(e) => {
                        //   // Enhanced keyboard handling for sorting
                        //   if (
                        //     header.column.getCanSort() &&
                        //     (e.key === "Enter" || e.key === " ")
                        //   ) {
                        //     e.preventDefault();
                        //     header.column.getToggleSortingHandler()?.(e);
                        //   }
                        // }}
                        // tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        <span className="truncate">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </span>
                        <div className="flex items-center gap-1">
                          {column.columnDef.enableSorting &&
                            !header.column.getIsSorted() && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                onClick={() => column.toggleSorting(false)}
                              >
                                <ArrowUpDown
                                  className="opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            )}
                          {{
                            asc: (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                onClick={() => column.toggleSorting(true)}
                              >
                                <ArrowUp
                                  className="opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            ),
                            desc: (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                onClick={() => column.toggleSorting(false)}
                              >
                                <ArrowDown
                                  className="opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className:
                                "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
                            }}
                          />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const isPinned = column.getIsPinned();
                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right");

                  return (
                    <TableCell
                      key={cell.id}
                      className="[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l"
                      style={{ ...getPinningStyles(column) }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                            ? "right"
                            : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {table.getRowModel().rows?.length === 0 && !loading && <Empty />}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs z-10">
          <LoaderCircleIcon
            className="-ms-1 animate-spin"
            size={26}
            aria-hidden="true"
          />
        </div>
      )}
      <DataTablePagination table={table} total={total} />
    </div>
  );
}

import React, { useState, FC } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import useMediaQuery from "@/hooks/utils/useMediaQuery";
import ListLoading from "@/components/ListLoading";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  filterColumn?: string;
  filterPlaceholder?: string;
  CustomFilterComponent?: FC<{
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
}

function DataTable<TData, TValue>({
  data,
  columns,
  isLoading,
  filterColumn = "",
  filterPlaceholder = "Search...",
  CustomFilterComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isLoading) return <ListLoading />;

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex justify-between">
        {CustomFilterComponent ? (
          <CustomFilterComponent
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
          />
        ) : filterColumn ? (
          <Input
            placeholder={filterPlaceholder}
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-96"
          />
        ) : null}
      </div>
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: isMobile && index === 0 ? "150px" : "auto",
                        position: isMobile && index === 0 ? "sticky" : "static",
                        left: isMobile && index === 0 ? 0 : "auto",
                        zIndex: isMobile && index === 0 ? 1 : "auto",
                        background:
                          isMobile && index === 0 ? "white" : "inherit",
                        borderRight:
                          isMobile && index === 0
                            ? "1px solid #e5e7eb"
                            : "none",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        position: isMobile && index === 0 ? "sticky" : "static",
                        left: isMobile && index === 0 ? 0 : "auto",
                        zIndex: isMobile && index === 0 ? 1 : "auto",
                        background:
                          isMobile && index === 0 ? "white" : "inherit",
                        borderRight:
                          isMobile && index === 0
                            ? "1px solid #e5e7eb"
                            : "none",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;

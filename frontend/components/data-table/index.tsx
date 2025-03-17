"use client";
import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
  OnChangeFn,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import TableTabs from "./Tabs";
import TableHeader from "./TableHeader";
import { TableFooter } from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";
import DataTablePagination from "./Footer/Pagination2";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  totalCount: number;
  filters: ColumnFiltersState;
  setFilters: OnChangeFn<ColumnFiltersState>;
  counts: {
    archived: number;
    onTrack: number;
    onHold: number;
    potentialRisk: number;
    risk: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  sorting,
  setSorting,
  pagination,
  setPagination,
  totalCount,
  filters,
  setFilters,
  counts = {
    archived: 0,
    onTrack: 0,
    onHold: 0,
    potentialRisk: 0,
    risk: 0,
  },
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting, //this will set the sorting state of respective columns
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, //server side bata garda yeslai true garne
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      sorting, //sorting state here
      pagination,
    },
    rowCount: totalCount, //here is total record count
  });

  if (isLoading) {
    return (
      <div className="flex flex-col pb-10">
        <TableTabs filters={filters} setFilters={setFilters} counts={counts} />
        <div className="rounded-md border relative">
          <Table>
            <TableHeader table={table} />
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-fit py-52 text-center"
                >
                  <div>
                    <BeatLoader size={10} color="#000" className="mx-auto" />
                    <p className="mt-4 text-base">Loading...</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <TableFooter table={table} />
      </div>
    );
  }
  return (
    <div className="flex flex-col pb-10">
      <TableTabs filters={filters} setFilters={setFilters} counts={counts} />
      <div className="rounded-md border relative">
        <Table>
          <TableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      {/* <DataTablePagination
      table={table}
      totalRows={totalCount}
      pageSizeOptions={[20,40,60,100]}

      /> */}
      <TableFooter table={table} />
    </div>
  );
}

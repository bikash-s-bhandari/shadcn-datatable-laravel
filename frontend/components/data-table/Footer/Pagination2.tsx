import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons";
  import { type Table } from "@tanstack/react-table";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOptions?: number[];
    totalRows?: number;
  }
  
  const DataTablePagination = <TData,>({
    table,
    totalRows = 0,
    pageSizeOptions = [5, 10, 20, 30, 40, 50],
  }: DataTablePaginationProps<TData>) => {
    return (
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
        {/* Selected Rows Info */}
        <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {totalRows} row(s) selected.
        </div>
  
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          {/* Rows per page selector */}
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[4.5rem]">
                <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
  
          {/* Page Info */}
          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
  
          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* First Page */}
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
            </Button>
  
            {/* Previous Page */}
            <Button
              aria-label="Go to previous page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </Button>
  
            {/* Next Page */}
            <Button
              aria-label="Go to next page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </Button>
  
            {/* Last Page */}
            <Button
              aria-label="Go to last page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DataTablePagination;
  
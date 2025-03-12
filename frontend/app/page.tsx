"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import TopHeader from "@/components/data-table/Header";

import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services";
import { useQueryState } from "nuqs";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useDebounce } from 'use-debounce';

const IndexPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });

  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);

  const [searchQuery, _] = useQueryState("searchQuery", {
    defaultValue: "",
  });
  
  // Debounce the searchQuery for API calls
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000); 


  const { data, isFetching, isError } = useQuery({
    queryKey: ["projects", debouncedSearchQuery, sorting,pagination,filters], //when searchQuery,sorting changes, react query will refetch the data or run perticular query
    queryFn: () => ProjectService.getProjects({ searchQuery: debouncedSearchQuery, sorting,pagination,filters }),
  });
  
  if(isError) {
    return <div>Error..</div>
  }
  
  //pageIndex: number; is page number or current page
  //pageSize: number;
  return (
    <div className="flex flex-col w-full gap-10">
      <TopHeader />
      <DataTable
        data={data?.data?.projects || []}
        columns={columns}
        isLoading={isFetching}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={data?.data?.totalCount || 0} //pagination ko lagi records ko total count
        filters={filters}
        setFilters={setFilters}
        counts={data?.data?.counts}
      />
      
    </div>
  );
};

export default IndexPage;

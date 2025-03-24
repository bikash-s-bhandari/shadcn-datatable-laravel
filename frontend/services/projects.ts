import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import myAxios from "@/lib/axios.config";
import apiClient from "@/lib/api-client";

const getProjects = async ({
  searchQuery,
  sorting,
  pagination,
  filters
}: {
  searchQuery: string;
  sorting: SortingState;
  pagination:PaginationState,
  filters:ColumnFiltersState
}) => {
  const response = await apiClient.post("/projects", { searchQuery, sorting,pagination,filters });
  return response.data;
};

export default {
  getProjects,
};

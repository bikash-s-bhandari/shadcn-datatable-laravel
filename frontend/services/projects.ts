import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import api from "./api";

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
  const response = await api.post("/projects", { searchQuery, sorting,pagination,filters });
  return response.data;
};

export default {
  getProjects,
};

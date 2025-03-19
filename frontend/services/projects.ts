import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import myAxios from "@/lib/axios.config";

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
  const response = await myAxios.post("/projects", { searchQuery, sorting,pagination,filters });
  return response.data;
};

export default {
  getProjects,
};

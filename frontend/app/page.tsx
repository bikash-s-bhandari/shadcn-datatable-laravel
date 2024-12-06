import { DataTable } from "@/components/data-table";
import TopHeader from "@/components/data-table/Header";

import { projects } from "./data";
import { columns } from "./columns";

const IndexPage = () => {
  return (
    <div className="flex flex-col w-full gap-10">
      <TopHeader />
      <DataTable data={projects} columns={columns} />
    </div>
  );
};

export default IndexPage;

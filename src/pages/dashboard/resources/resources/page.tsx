import { useResourceTableStore } from "@/context/ResourceTableContext";
import Pagination from "./components/Pagination";
import ResourceTable from "./components/ResourcesTable";
import SelectColumns from "./components/SelectColumns";
import SearchBar from "./components/SearchBar";
import ResetTable from "./components/ResetTable";
import { Link } from "react-router";

export default function Resources() {
  const { currentPage, pageSize, setCurrentPage, data } =
    useResourceTableStore();

  return (
    <>
      <div className="grid grid-cols-2 flex-wrap border-b-2 border-accent-green/50 py-4 ">
        <div className="flex gap-2">
          <Link
            to={`/dashboard/resources/add`}
            className="text-white bg-accent-green px-4 py-2 rounded hover:bg-accent-green/50"
          >
            Add
          </Link>
          <SelectColumns />
        </div>
        <div className="flex gap-2">
          <SearchBar />
          <ResetTable />
        </div>
      </div>

      <div className="p-4 bg-[#00000020] rounded-xl w-full overflow-x-auto">
        <ResourceTable />
      </div>
      <div className="flex justify-end gap-2">
        <Pagination
          currentPage={currentPage}
          onClick={setCurrentPage}
          pageSize={pageSize}
          dataLength={data.length}
        />
      </div>
    </>
  );
}

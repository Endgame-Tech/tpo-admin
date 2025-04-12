import { useUserTableStore } from "@/context/UserTableContexts";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SelectColumns from "./SelectColumns";
import UserTable from "./UserTable";
import ResetTable from "./ResetTable";

export default function UserSection() {
  const { currentPage, pageSize, setCurrentPage, data } = useUserTableStore();
  return (
    <>
      <div className="grid gap-4">
        <p className="text-white text-2xl">Users</p>
        <div className="bg-accent-orange h-[1px] w-full"></div>
        <div className="grid grid-cols-2 flex-wrap border-b-2 border-accent-green/50 py-4 ">
          <div className="flex gap-4">
            <SelectColumns />
          </div>
          <div className="flex gap-4">
            <SearchBar />
            <ResetTable />
          </div>
        </div>

        <div className="p-4 bg-[#00000020] rounded-xl w-full overflow-x-auto">
          <UserTable />
        </div>
        <div className="flex justify-end gap-2 ">
          <Pagination
            currentPage={currentPage}
            onClick={setCurrentPage}
            pageSize={pageSize}
            dataLength={data.length}
          />
        </div>
      </div>
    </>
  );
}

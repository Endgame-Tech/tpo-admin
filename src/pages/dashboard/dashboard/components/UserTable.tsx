import Options from "./Options";
import TableColumns from "./TableColumns";
import { useUserTableStore } from "@/context/UserTableContexts";
import { useEffect } from "react";

export default function UserTable() {
  const {
    columns,
    search,
    currentPage,
    sortColumn,
    isAscending,
    data,
    fetchProfiles,
  } = useUserTableStore();

  useEffect(() => {
    fetchProfiles();
  }, [columns, search, currentPage, sortColumn, isAscending]);

  return (
    <table className="min-w-full">
      <thead>
        <tr className="font-normal text-[#D63E72]">
          <TableColumns
            ColumnsDetails={{
              label: "Name",
              columnName: "last_name",
              hasSorting: true,
              hasFilter: false,
            }}
          />

          {columns?.map((tableHeader, index) =>
            tableHeader?.display ? (
              <TableColumns
                key={tableHeader.value || `column-${index}`}
                ColumnsDetails={{
                  ...tableHeader,
                  columnName: tableHeader.value,
                }}
              />
            ) : null
          )}
        </tr>
      </thead>
      <tbody className="text-[#C6C6C6]">
        {data?.map((profile) => (
          <tr
            key={profile?.member_id || `profile-${Math.random()}`}
            className="text-sm"
          >
            <td className="p-4">
              <div className="grid gap-1">
                <p className="capitalize">
                  {profile?.last_name} {profile?.first_name}
                </p>
                <p className="text-xs flex gap-1 items-center">
                  <span className="text-[#FFFFFF]">ID:</span>

                  <span className="bg-[#2DB47520] rounded p-1 whitespace-nowrap">
                    {profile?.member_id}
                  </span>
                </p>
              </div>
            </td>
            {columns?.map((tableHeader, columnIndex) =>
              tableHeader.display ? (
                <>
                  {tableHeader?.value === "is_verified_user" ? (
                    <td
                      key={`${profile?.member_id}-${tableHeader.value || columnIndex
                        }`}
                      className={`px-4 whitespace-nowrap ${profile?.[tableHeader?.value]
                          ? " text-green-400"
                          : "text-yellow-300"
                        }`}
                    >
                      {`${profile?.[tableHeader?.value] ? " Verified" : "Pending"
                        }`}
                    </td>
                  ) : (
                    <td
                      key={`${profile?.member_id}-${tableHeader.value || columnIndex
                        }`}
                      className="px-4 whitespace-nowrap"
                    >
                      {`${profile?.[tableHeader?.value]}`}
                    </td>
                  )}
                </>
              ) : null
            )}

            <td className="text-center">
              <Options profile={profile} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

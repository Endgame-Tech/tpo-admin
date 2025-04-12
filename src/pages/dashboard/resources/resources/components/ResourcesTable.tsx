import { useResourceTableStore } from "@/context/ResourceTableContext";
import Options from "./Options";
import TableColumns from "./TableColumns";
import { useEffect } from "react";


export default function ResourceTable() {
  const {
    columns,
    search,
    currentPage,
    sortColumn,
    isAscending,
    data,
    fetchResources,
  } = useResourceTableStore();

  useEffect(() => {
    fetchResources();
  }, [columns, search, currentPage, sortColumn, isAscending]);

  return (
    <table className="min-w-full">
      <thead>
        <tr className="font-normal text-[#D63E72]">

          {columns?.map((tableHeader) =>
            tableHeader?.display ? (
              <TableColumns
                key={tableHeader.value}
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
        {data?.map((resource: ResourceType) => (
          <tr key={resource?.resource_id} className="text-sm ">
            {columns?.map((tableHeader: Column) =>
              tableHeader.display ? (
                <td key={tableHeader.value} className="p-4 whitespace-nowrap">
                  {getResourceValue(tableHeader.value, resource)}
                </td>
              ) : null
            )}

            <td className="text-center">
              <Options resource={resource} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function isResourceKey(
  key: string,
  resource: ResourceType
): key is keyof ResourceType {
  return key in resource;
}


function getResourceValue(key: string, resource: ResourceType): string {
  if (!isResourceKey(key, resource)) return "N/A";
  const value = resource[key];
  return typeof value === "object" ? JSON.stringify(value) : value ?? "N/A";
}

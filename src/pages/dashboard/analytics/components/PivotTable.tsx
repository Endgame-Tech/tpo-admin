import { useEffect, useState } from "react";
import { usePivotTableStore } from "@/context/PivotTableContext";
import PivotTableColumns from "./PivotTableColumns";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/Toast";

export default function PivotTable() {
  // Use Zustand store directly
  const {  selectedCol, selectedRow, setIsPivotLoading } =
    usePivotTableStore((state) => state);

  const { addToast } = useToast();
  const [table, setTable] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<Column[] | null>(null);

  useEffect(() => {
    async function getPivotTable() {
      setIsPivotLoading(true);
      const { data, error } = await supabase.rpc("get_grouped_users", {
        row_col_name: selectedRow?.value,
        col_col_name: selectedCol?.value,
      });

      if (error) {
        addToast(`Error fetching grouped data:${error.message}`, "error");
        setIsPivotLoading(false);
        console.error("Error fetching grouped data:", error);
        return;
      }

      if (!selectedCol || !selectedRow) {
        addToast(`Error grouping data: No Column Selected`, "error");
        setIsPivotLoading(false);
        console.error("Error grouping data: No Column Selected", error);
        return;
      }

      const [pivotTable, columns] = formatPivotData(
        data,
        selectedRow,
        selectedCol
      );
      const configuredColumns = configureColumns(columns);
      setTable(pivotTable);
      setColumns(configuredColumns);
      setIsPivotLoading(false);
    }

    if (selectedCol && selectedRow) {
      getPivotTable();
    }
  }, [selectedCol, selectedRow]);

  if (!table) {
    return (
      <div className="border-dashed bg-[#00000020] rounded-lg w-full h-[300px] border-2 border-accent-green/30 flex justify-center items-center text-white/50">
        <p className="w-[400px] text-center">
          Please select both the columns you want on the X axis and the Y axis
          to generate the pivot table.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#00000020] rounded-xl w-full overflow-x-auto">
      <table className="min-w-full ">
        <thead className="border-b border-b-white">
          <tr className="font-normal text-white">
            {columns?.map((tableHeader) =>
              tableHeader?.display ? (
                <PivotTableColumns
                  key={tableHeader.value}
                  ColumnsDetails={{
                    ...tableHeader,
                    columnName: tableHeader.value,
                  }}
                />
              ) : null
            )}
            <td
              className={`bg-accent-orange/20 font-semibold text-white
                `}
            >
              <div className="flex justify-between items-center px-4 py-2">
                <p className="text-sm whitespace-nowrap"> Grand Total</p>
              </div>
            </td>
          </tr>
        </thead>
        <tbody className="text-[#C6C6C6]">
          {table?.map((data: any[], indx: number) => (
            <tr
              key={data[0]}
              className={`text-sm ${
                table.length - 1 === indx
                  ? "bg-accent-orange/20 font-semibold"
                  : ""
              }`}
            >
              {data?.map((value, index) => (
                <td
                  key={index}
                  className={`p-4 ${index === 0 ? "text-left" : "text-right"}`}
                >
                  {value}
                </td>
              ))}
              <td className="p-4 bg-accent-orange/20 font-bold text-right">
                {getRowTotal(data)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getRowTotal(data: any[]) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    if (i > 0) {
      total += +data[i];
    }
  }

  return total;
}

function formatPivotData(
  data: GroupType[],
  selectedRow: SelectOptionType,
  selectedCol: SelectOptionType
) {
  const rows = [...new Set(data.map((item) => item.row_data))];
  const columns = [...new Set(data.map((item) => item.col_data))];
  const pivotTable: any[] = [];
  let colTotal: any[] = columns.map((_) => 0);

  for (let row of rows) {
    let r: any[] = [row];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const [count] = data.filter(
        (item) => item.col_data === column && item.row_data === row
      );
      r.push(count?.user_count || 0);
      colTotal[i] += +count?.user_count || 0;
    }
    pivotTable.push(r);
  }

  colTotal.unshift("Grand Total");
  pivotTable.push(colTotal);
  columns.unshift(`${selectedRow.name}/${selectedCol.name}`);

  return [pivotTable, columns];
}

function configureColumns(columns: string[]) {
  return columns.map((col) => {
    return {
      label: col,
      display: true,
      value: col,
      info: "",
      hasSorting: false,
      hasFilter: false,
      isFetch: false,
    };
  });
}

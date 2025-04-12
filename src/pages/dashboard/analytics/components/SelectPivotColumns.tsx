import { usePivotTableStore } from "@/context/PivotTableContext";
import { useState } from "react";
import Select from "@/components/select/Select";
import { convertToOptions } from "@/utils/helpers";
import { SpinningArrow } from "@/components/loading/Loading";

export default function SelectPivotColumns() {
  // Use Zustand store directly
  const [pivotRow, setPivotRow] = useState<SelectOptionType | null>(null);
  const [pivotCol, setPivotCol] = useState<SelectOptionType | null>(null);
  const { setSelectedRow, setSelectedCol, columns, isPivotLoading } =
    usePivotTableStore((state) => state);

  function onApplyPivot() {
    if (pivotRow && pivotCol) {
      setSelectedRow(pivotRow);
      setSelectedCol(pivotCol);
    }
  }

  return (
    <section className="flex gap-4 items-end text-white">
    
      <div>
        <label htmlFor="">Row</label>
        <Select
          options={convertToOptions(columns, "Select Row")}
          onChange={(value) => setPivotRow(value)}
        />
      </div>
      <div>
        <label htmlFor="">Columns</label>
        <Select
          options={convertToOptions(columns, "Select Column")}
          onChange={(value) => setPivotCol(value)}
        />
      </div>
      <div className="">
        <button
          onClick={onApplyPivot}
          disabled={!pivotRow || !pivotCol}
          className={`px-4 py-2 rounded ${
            !pivotRow || !pivotCol
              ? "opacity-20 bg-white text-black"
              : "bg-accent-green text-white"
          }`}
        >
          Apply
        </button>
      </div>
        {isPivotLoading && <div className="p-2"><SpinningArrow/></div>}
    </section>
  );
}

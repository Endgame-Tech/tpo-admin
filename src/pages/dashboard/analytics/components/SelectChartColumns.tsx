import { useState } from "react";
import Select from "@/components/select/Select";
import { convertToOptions } from "@/utils/helpers";
import { useChartStore } from "@/context/ChartContext";

export default function SelectChartColumns() {
  const [pivotCol, setPivotCol] = useState<SelectOptionType | null>(null);
  const { setSelectedCol, columns } = useChartStore((state) => state);

  function onApplyPivot() {
    if (pivotCol) {
      setSelectedCol(pivotCol);
    }
  }

  return (
    <section className="flex gap-4 items-end text-white">
      <div>
        <label htmlFor="">X axis</label>
        <Select
          options={convertToOptions(columns, "Select X axis")}
          onChange={(value) => setPivotCol(value)}
        />
      </div>
      <div className="">
        <button
          onClick={onApplyPivot}
          disabled={!pivotCol}
          className={`px-4 py-2 rounded ${
            !pivotCol
              ? "opacity-20 bg-white text-black"
              : "bg-accent-green text-white"
          }`}
        >
          Apply
        </button>
      </div>
    </section>
  );
}

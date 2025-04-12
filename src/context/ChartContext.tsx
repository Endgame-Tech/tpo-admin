import { create } from "zustand";
import React, { createContext, ReactNode } from "react";
import { defaultAnalyticColumns } from "@/constants";
// import { AnalyticColumns } from "@/constants";

// Create Zustand store
export const useChartStore = create<ChartState>((set) => ({
  columns: defaultAnalyticColumns,
  selectedCol: null,
  setSelectedCol: (newCol: SelectOptionType) => set({ selectedCol: newCol }),
}));

// Context Wrapper
const ChartContext = createContext<ChartState | undefined>(undefined);

export const ChartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useChartStore();

  return (
    <ChartContext.Provider value={store}>
      {children}
    </ChartContext.Provider>
  );
};

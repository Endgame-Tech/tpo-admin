import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import React, { createContext, ReactNode } from "react";
import {  defaultAnalyticColumns } from "@/constants";

// Create Zustand store
export const usePivotTableStore = create<PivotTableState>((set, get) => ({
  data: [],
  columns: defaultAnalyticColumns,
  currentPage: 1,
  pageSize: 25,
  selectedCol: null,
  selectedRow:null,
  setSelectedRow: (newRow: SelectOptionType) => set({ selectedRow: newRow }),
  setSelectedCol: (newCol: SelectOptionType) => set({ selectedCol: newCol }),
  isPivotLoading: false,
  setIsPivotLoading: (newPivotLoading: boolean) => set({ isPivotLoading: newPivotLoading }),

  fetchProfiles: async ({
    filterColumns = [],
    sortColumn = "first_name",
    sortOrder = "asc",
    page = 1,
    search = "",
  }) => {
    try {
      let query = supabase.from("profile").select("*");
      
      // Apply multi-column filtering
      
      for (let col of filterColumns) {
        const opt = col?.selectedOptions
        if ((opt?.length || 0) > 0) {
          if (opt) {
              query = query.in(col.value, opt);
            }
          }
        }
      

      // Apply sorting
      query = query.order(sortColumn, { ascending: sortOrder === "asc" });

      // Apply search
      query = search
        ? query.or(
            `first_name.ilike.%${search}%, last_name.ilike.%${search}%, middle_name.ilike.%${search}%`
          )
        : query;

      // Apply pagination
      const start = (page - 1) * get().pageSize;
      const end = start + get().pageSize - 1;
      query = query.range(start, end);

      // Execute query
      const { data, error } = await query;
          
      if (error) {
        console.error("Error fetching profiles:", error);
        throw error;
      }

      set({ data, currentPage: page });
    } catch (error) {
      console.error("Unexpected error:", error);
      throw error;
    }
  },

  paginate: (pageNumber: number, pageSize: number) => {
    set({ currentPage: pageNumber, pageSize });
  },

  addColumn: (column: string) => {
    set((state) => {
      const updatedColumns = state.columns.map((col) =>
        col.label === column ? { ...col, display: true } : col
      );

      // Save updated columns to local storage
      localStorage.setItem("columns", JSON.stringify(updatedColumns));

      return { columns: updatedColumns };
    });
  },

  updateFilterConfig: (column: string, selectedOptions: string[] = []) => {
    let updatedColumns: Column[] = [];
    set((state) => {
      updatedColumns = state.columns.map((col) =>
        col.label === column
          ? { ...col, selectedOptions: selectedOptions }
          : col
      );
      // Save updated columns to local storage
      localStorage.setItem("columns", JSON.stringify(updatedColumns));

      return { columns: updatedColumns };
    });

    return updatedColumns;
  },

  removeColumn: (column: string) => {
    set((state) => {
      const updatedColumns = state.columns.map((col) =>
        col.label === column ? { ...col, display: false } : col
      );

      // Save updated columns to local storage
      localStorage.setItem("columns", JSON.stringify(updatedColumns));

      return { columns: updatedColumns };
    });
  },

  resetColumn: (column: string) => {
    let updatedColumns: Column[] = [];
    set((state) => {
      updatedColumns = state.columns.map((col) =>
        col.label === column ? { ...col, selectedOptions: [] } : col
      );
      // Save updated columns to local storage
      localStorage.setItem("columns", JSON.stringify(updatedColumns));

      return { columns: updatedColumns };
    });

    return updatedColumns;
  },

  resetColumns: () => {
    // Reset state
    set({ columns: defaultAnalyticColumns });

    // Update local storage
    localStorage.setItem("defaultAnalyticColumns", JSON.stringify(defaultAnalyticColumns));
  },

  setPageSize: (size: number) => {
    set({ pageSize: size });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
}));

// Context Wrapper
const PivotTableContext = createContext<PivotTableState | undefined>(undefined);

export const PivotTableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = usePivotTableStore();

  return (
    <PivotTableContext.Provider value={store}>
      {children}
    </PivotTableContext.Provider>
  );
};

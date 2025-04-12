import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import React, { createContext, ReactNode, useContext } from "react";
import { defaultResourceColumns } from "@/constants";
import { savedResourceColumns } from "@/utils/helpers";

// Create Zustand store
export const useResourceTableStore = create<ResourceTableState>((set, get) => ({
  data: [],
  columns: savedResourceColumns,
  currentPage: 1,
  pageSize: 25,
  sortColumn: "",
  isAscending: true,
  search: "",

  fetchResources: async () => {
    try {
      let query = supabase.from("resources").select("*");

      const columns = get().columns;
      const sortColumn = get().sortColumn;
      const isAscending = get().isAscending;
      const currentPage = get().currentPage;
      const search = get().search;

      
      for (let col of columns) {
        let opt = col?.selectedOptions?.filter((item) => item !== null); // Remove null values
      
        if (opt && opt.length > 0) {
          query = query.in(col.value, opt);
        }
      }
      

      if (!!sortColumn) {
        query = query.order(sortColumn, { ascending: isAscending});
      }
      
      query = search
        ? query.or(
             `title.ilike.%${search}%, sub_title.ilike.%${search}%, author.ilike.%${search}%`
          )
        : query;

      // Apply pagination
      const start = (currentPage - 1) * get().pageSize;
      const end = start + get().pageSize - 1;
      query = query.range(start, end);

      // Execute query
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching profiles:", error);
        throw error;
      }

      set({ data });
      localStorage.setItem('resource', JSON.stringify(columns));
    } catch (error) {
      console.error("Unexpected error:", error);
      throw error;
    }
  },

  paginate: (pageNumber: number, pageSize: number) => {
    set({ currentPage: pageNumber, pageSize });
  },

  addColumn: (column: string) => {
    const currentColumns = get().columns;
    const updatedColumns = currentColumns.map((col) =>
      col.label === column ? { ...col, display: true } : col
    );
    set({ columns: updatedColumns });
  },

  updateColumnFilter: (column: string, selectedOptions: string[] = []) => {
    const currentColumns = get().columns;
    const updatedColumns = currentColumns.map((col) =>
      col.label === column ? { ...col, selectedOptions: selectedOptions } : col
    );
    set({ columns: updatedColumns });
  },

  removeColumn: (column: string) => {
    const currentColumns = get().columns;
    const updatedColumns = currentColumns.map((col) =>
      col.label === column ? { ...col, display: false } : col
    );
    set({ columns: updatedColumns });
  },

  resetColumn: (column: string) => {
    const currentColumns = get().columns;
    const updatedColumns = currentColumns.map((col) =>
      col.label === column ? { ...col, selectedOptions: [] } : col
    );
    set({ columns: updatedColumns });
  },

  resetColumns: () => {
    set({ columns: defaultResourceColumns });
  },

  setPageSize: (size: number) => {
    set({ pageSize: size });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  updateSearch: (search: string) => {
    set({ search: search });
  },

  sortData: (sortColumn, isAscending) => {    
    set({ sortColumn, isAscending });
  },
}));

// Context Wrapper
const ResourceTableContext = createContext<ResourceTableState | undefined>(
  undefined
);

export const ResourceTableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useResourceTableStore();

  return (
    <ResourceTableContext.Provider value={store}>
      {children}
    </ResourceTableContext.Provider>
  );
};

// Custom hook to use the store within context
export const useResourceTable = () => {
  const context = useContext(ResourceTableContext);
  if (!context) {
    throw new Error(
      "useResourceTable must be used within a ResourceTableProvider"
    );
  }
  return context;
};

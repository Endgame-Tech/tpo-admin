import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import React, { createContext, ReactNode } from "react";
import { savedUserColumns } from "@/utils/helpers";
import { defaultUsersColumns } from "@/constants";

// Create Zustand store
export const useUserTableStore = create<UserTableState>((set, get) => ({
  data: [],
  columns: savedUserColumns,
  currentPage: 1,
  pageSize: 25,
  sortColumn: "",
  isAscending: true,
  search: "",

  fetchProfiles: async () => {
    try {
      let query = supabase.from("profile").select("*");

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
      
      // Apply sorting
      if (!!sortColumn) {
        query = query.order(sortColumn, { ascending: isAscending});
      }

      // Apply search
      query = search
        ? query.or(
            `first_name.ilike.%${search}%, last_name.ilike.%${search}%, middle_name.ilike.%${search}%`
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
      localStorage.setItem("users", JSON.stringify(columns));
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
    // Reset state
    set({ columns: defaultUsersColumns });
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
const UserTableContext = createContext<UserTableState | undefined>(undefined);

export const UserTableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useUserTableStore();

  return (
    <UserTableContext.Provider value={store}>
      {children}
    </UserTableContext.Provider>
  );
};

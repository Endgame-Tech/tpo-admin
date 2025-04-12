/// <reference types="vite/client" />

interface BaseOptionType {
  id: number;
  value: any;
  label: string;
  disabled?: boolean;
}

interface SelectOptionType extends BaseOptionType {
  name: string;
  unavailable: boolean;
  label?: string;
}

interface CategoricalColumnsType {
  gender: BaseOptionType[];
}

interface Column {
  label: string;
  display: boolean;
  value: string;
  info: string;
  hasSorting: boolean;
  hasFilter: boolean;
  isFetch: boolean;
  filterOptionsData?: string;
  selectedOptions?: string[];
}

interface Column {
  label: string;
  display: boolean;
  value: string;
  info: string;
  hasSorting: boolean;
  hasFilter: boolean;
  isFetch: boolean;
  filterOptionsData?: string;
  selectedOptions?: string[];
}

// Store interface
interface UserTableState {
  data: any[];
  columns: Column[];
  currentPage: number;
  pageSize: number;
  sortColumn: string;
  isAscending: boolean;
  search: string;

  // Methods
  fetchProfiles: () => Promise<void>;
  paginate: (pageNumber: number, pageSize: number) => void;
  addColumn: (column: string) => void;
  removeColumn: (column: string) => void;
  resetColumns: () => void;
  resetColumn: (column: string) => void;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  updateColumnFilter: (column: string, selectedOptions: string[]) => void;
  updateSearch: (search: string) => void;
  sortData: (sortColumn: string, isAscending: boolean) => void;
}
interface ResourceTableState {
  data: any[];
  columns: Column[];
  currentPage: number;
  pageSize: number;
  sortColumn: string;
  isAscending: boolean;
  search: string;

  // Methods
  fetchResources: () => Promise<void>;
  paginate: (pageNumber: number, pageSize: number) => void;
  addColumn: (column: string) => void;
  removeColumn: (column: string) => void;
  resetColumns: () => void;
  resetColumn: (column: string) => void;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  updateColumnFilter: (column: string, selectedOptions: string[]) => void;
  sortData: (sortColumn: string, isAscending: boolean) => void;
  updateSearch: (search: string) => void;
}

interface PivotTableState {
  data: any[];
  columns: Column[];
  currentPage: number;
  pageSize: number;
  selectedCol: SelectOptionType | null;
  selectedRow: SelectOptionType | null;
  isPivotLoading: boolean;
  setSelectedRow: (newRow: SelectOptionType) => void;
  setSelectedCol: (newCol: SelectOptionType) => void;
  setIsPivotLoading: (newPivotLoading: boolean) => void;

  // Methods
  fetchProfiles: (params: {
    filterColumns?: Column[];
    filterValues?: string[] | string | null;
    sortColumn?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    search?: string;
  }) => Promise<void>;
  paginate: (pageNumber: number, pageSize: number) => void;
  addColumn: (column: string) => void;
  removeColumn: (column: string) => void;
  resetColumns: () => void;
  resetColumn: (column: string) => Column[];
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  updateFilterConfig: (column: string, selectedOptions: string[]) => Column[];
}
interface ChartState {
  columns: Column[];
  selectedCol: SelectOptionType | null;
  setSelectedCol: (newCol: SelectOptionType) => void;
}

interface GroupType {
  row_data: string; // row_data TEXT,
  col_data: string; // col_data TEXT,
  user_count: number; // user_count BIGINT
}

interface BarChartType {
  unique_column: string; // col_data TEXT,
  user_count: number; // user_count BIGINT
}

interface BarChartData {
  labels: string[];
  datasets: DatasetType[];
}

interface DatasetType {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ObjectType {
  [key: string]: any;
}

interface ColumnsDetails {
  label: string;
  columnName: string;
  hasFilter: boolean;
  hasSorting: boolean;
  isFetch?: boolean;
  filterOptionsData?: string;
}

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  dataLength: number;
  onClick: (newPage: number) => void;
}

interface ResourceType {
  title: string | null;
  sub_title: string | null;
  author: string | null;
  images_url: string | null;
  resource_url: string | null;
  permissions: ObjectType | null;
  resource_id?: string | null;
}

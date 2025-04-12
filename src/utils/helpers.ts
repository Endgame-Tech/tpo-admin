import { defaultResourceColumns, defaultUsersColumns } from "@/constants";

export function convertToOptions(columns: Column[], placeholderName='Select'): SelectOptionType[]{
    let placeholder = {
        id: 0,
        name: placeholderName,
        value: '',
        unavailable: true,
    }
    const  cols = columns.map((col,index) => {
        return {
            id: index+1,
            name: col.label,
            value: col.value,
            unavailable: false,
        }
    })

    return [placeholder, ...cols]
}


export const savedUserColumns: Column[] = getDefaultColumns('users', defaultUsersColumns);
export const savedResourceColumns: Column[] = getDefaultColumns('resource', defaultResourceColumns);
// export const savedColumns: Column[] = getDefaultColumns();
function getDefaultColumns(table_name: string, fallback: Column[]) {
  const columns = localStorage.getItem(table_name);

  if (columns) {
    try {
      return JSON.parse(columns);
    } catch (error) {
      console.error("Failed to parse saved columns:", error);
    }
  }

  // Save to localStorage
  localStorage.setItem(table_name, JSON.stringify(fallback));
  return fallback;
}
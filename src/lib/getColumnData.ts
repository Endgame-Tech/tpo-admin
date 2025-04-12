import { supabase } from "./supabaseClient";

export async function fetchColumnData(setValue: any, column: string) {  
  const { data, error } = await supabase.from(column).select("id, name");
  if (data) {
    const options = data.map((item: any) => {
      return { id: item.id, label: item.name, value: item.name };
    });    
    setValue(options);
  } else {
    console.error(error)
    setValue([]);
  }
}

type CategoricalColumnsType = {
  gender: { id: number; label: string; value: string }[];
  is_verified: { id: number; label: string; value: boolean }[];
};

export async function getLocalColumnData(setValue: any, column: keyof CategoricalColumnsType) {
  const columns: CategoricalColumnsType = {
    gender: [
      { id: 1, label: "Male", value: "Male" },
      { id: 2, label: "Female", value: "Female" },
    ],
    is_verified: [
      { id: 1, label: "true", value: true },
      { id: 2, label: "false", value: false },
    ],
  };

  const selectedColumn = columns?.[column];

  if (selectedColumn) {
    setValue(selectedColumn);
  } else {
    setValue([]);
  }
}

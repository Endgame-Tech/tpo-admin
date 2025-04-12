// import { useEffect } from "react";
import ComboboxComp from "./Combobox";
// import { supabase } from "../../supabase";

type TextInputProps = {
  type?: string;
  value?: string;
  onChange?: (value:Options | null) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  options?: Options[];
  defaultSelected?: string;
};
interface Options {
  id: number;
  [key: string]: any;
}

export default function FormCombobox({
  // type = "",
  // value = "",
  onChange = () => {},
  // placeholder = "",
  label = "",
  // className = "",
  required = false,
  options = [],
  defaultSelected = "",
}: TextInputProps) {
  // console.log('defaultSelected', defaultSelected);
  
  return (
    <div>
      <label className="block text-dark dark:text-gray-100 mb-2 text-sm">
        {label} {required && <span className="text-accent-green">*</span>}
      </label>
      <ComboboxComp options={options} onChange={onChange} defaultSelected={defaultSelected}/>
    </div>
  );
}

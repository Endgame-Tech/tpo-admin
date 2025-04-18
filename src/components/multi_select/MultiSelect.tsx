import  { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type TextInputProps = {
  defaultSelected?: BaseOptionType[];
  options?: BaseOptionType[];
  onChange?: (value: BaseOptionType[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
};

export default function MultiSelectComp({
  defaultSelected = [],
  options = [],
  onChange = () => {},
  placeholder = "",
  label = "",
  required = false,
}: TextInputProps) {
  
  const [selected, setSelected] = useState<BaseOptionType[]>([]);

  useEffect(() => {
    if (defaultSelected?.length > 0) {
      const filteredSelected = options?.filter((option) => defaultSelected.includes(option?.value));
      setSelected(filteredSelected);
    }
  }, [options, defaultSelected]);

  return (
    <div>
      <label className="block text-dark dark:text-gray-100 mb-2 text-sm">{label} {required && <span className="text-accent-green">*</span>}</label>
      <MultiSelect
        options={options}
        value={selected}
        onChange={(value:BaseOptionType[]) => {onChange(value); setSelected(value) }}
        labelledBy={placeholder}
        hasSelectAll={false}
        className="text-xs"
      />
    </div>
  );
};
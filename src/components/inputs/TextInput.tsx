import React from "react";

type TextInputProps = {
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
};

export default function TextInput({
  type = "",
  value = "",
  onChange = () => {},
  placeholder = "",
  label = "",
  className = "",
  required = false,
  autoFocus=true
}: TextInputProps) {
  return (
    <div>
      {" "}
      <label className="block text-dark dark:text-gray-100 mb-2 text-sm">
        {label} {required && <span className="text-accent-green">*</span>}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-secondary-light text-gray-700 dark:text-gray-200 ${className}`}
        required={required}
        autoFocus={autoFocus}
      />
    </div>
  );
}

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

export interface Option {
  id: number;
  [key: string]: any;
}

interface ComboboxCompProps {
  className?: string;
  options: Option[];
  onChange: (value: Option | null) => void;
  defaultSelected?: string;
}

export default function ComboboxComp({
  className = "",
  options = [],
  onChange = () => {},
  defaultSelected = "",
}: ComboboxCompProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option | null>();

  const filteredOptions =
    query === ""
      ? options
      : options.filter((person) => {
          return person?.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox
        value={selected}
        onChange={(value) => {
          onChange(value);
          setSelected(value);
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              `w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-secondary-light text-gray-700 dark:text-gray-200 ${className}`,
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(person: { id: number; [key: string]: any }) =>
              person?.name || ""
            }
            placeholder={defaultSelected}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-6 dark:fill-white   fill-black/90 group-data-[hover]:fill-white/50" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-black/50 dark:border-white/50 bg-white dark:bg-background-dark p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-20"
          )}
        >
          {filteredOptions.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
            >
              <CheckIcon className="invisible size-4 dark:fill-white fill-black  group-data-[selected]:visible" />
              <div className="text-sm/6 text-black dark:text-white placeholder-black/40">
                {person.name}
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </>
  );
}

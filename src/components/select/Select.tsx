import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import {  ChevronDownIcon } from "@heroicons/react/20/solid";

type SelectProps = {
  options: SelectOptionType[];
  onChange: (value: SelectOptionType) => void;
};

export default function Select({ options, onChange }: SelectProps) {
  const [selectedPerson, setSelectedPerson] = useState(options[0]);

  function onSelectItem(value: SelectOptionType) {
    setSelectedPerson(value);
    onChange(value);
  }

  return (
    <Listbox value={selectedPerson} onChange={onSelectItem}>
      <ListboxButton
        className={clsx(
          "relative block w-[200px] rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        )}
      >
        {selectedPerson.name}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--button-width)] rounded-xl border-2 border-white/10 bg-background-dark text-white [--anchor-gap:var(--spacing-1)] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 "
        )}
      >
        {options.map((option: any) => (
          <ListboxOption
            key={option.id}
            value={option}
            className={
              `p-2 border-b border-white/10  duration-300 cursor-pointer flex gap-2 ${option.unavailable?'text-white/50':'hover:bg-white/10'}`
            }
            disabled={option.unavailable}
          >

            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

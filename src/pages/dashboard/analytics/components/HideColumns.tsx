import { useUserTableStore } from "@/context/UserTableContexts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function HideColumns() {
  // Use Zustand store directly
  const columns = useUserTableStore((state) => state.columns);
  const addColumn = useUserTableStore((state) => state.addColumn);
  const removeColumn = useUserTableStore((state) => state.removeColumn);

  function onSwitchDisplay(column: string, display: boolean) {
    display ? removeColumn(column) : addColumn(column);
  }

  return (
    <Menu>
      <MenuButton className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 hover:text-accent-foreground p-2 h-fit">
        <div className="flex gap-2 text-white">
          <p>Hide Columns</p>
          <ChevronDownIcon className="size-4 text-white" />
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-black/10 bg-white p-1 text-sm/6 text-black/80  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 font-poppins dark:bg-background-dark dark:border-background-light/10 mt-2"
      >
        {columns.map((col) => (
          <MenuItem key={col.label}>
            <button
              onClick={() => onSwitchDisplay(col.label, col.display)}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light justify-between content-end"
            >
              {col.display && <CheckIcon className="size-4" />} 
              <div></div> 
              <span>{col.label}</span>{" "}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
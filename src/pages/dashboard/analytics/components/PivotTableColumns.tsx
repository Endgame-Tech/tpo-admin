import MultiSelectComp from "@/components/multi_select/MultiSelect";
import { usePivotTableStore } from "@/context/PivotTableContext";
import { fetchColumnData, getLocalColumnData } from "@/lib/getColumnData";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowPathIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function PivotTableColumns({
  ColumnsDetails,
}: {
  ColumnsDetails: ColumnsDetails;
}) {
  return (
    <td>
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-sm whitespace-nowrap">{ColumnsDetails.label}</p>
        <Options ColumnsDetails={ColumnsDetails} />
      </div>
    </td>
  );
}

function Options({ ColumnsDetails }: { ColumnsDetails: ColumnsDetails }) {
  const columnName = ColumnsDetails.columnName;
  const hasFilter = ColumnsDetails.hasFilter;
  const hasSorting = ColumnsDetails.hasSorting;

  const [isAscending, setIsAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState<BaseOptionType[]>([]);

  const { fetchProfiles, updateFilterConfig, resetColumn } = usePivotTableStore();

  useEffect(() => {
    if (ColumnsDetails.isFetch) {
      fetchColumnData(setOptions, ColumnsDetails?.filterOptionsData || "");
    } else {
      getLocalColumnData(
        setOptions,
        ColumnsDetails.filterOptionsData as unknown as keyof CategoricalColumnsType
      );
    }
  }, []);

  async function sortColumn() {
    setIsLoading(true);
    await fetchProfiles({
      sortColumn: columnName,
      sortOrder: isAscending ? "asc" : "desc",
    });
    setIsAscending(!isAscending);
    setIsLoading(false);
  }

  async function applyFilters() {
    setIsLoading(true);
    const selectedOptions = selectedFilters.map((filter) => filter.value);
    const columns = updateFilterConfig(ColumnsDetails.label, selectedOptions);

    await fetchProfiles({
      filterColumns: columns,
    });
    setIsLoading(false);
  }

  async function clearFilters() {
    setIsLoading(true);
    const columns = resetColumn(ColumnsDetails.label);

    await fetchProfiles({
      filterColumns: columns,
    });
    setIsLoading(false);
  }

  if (hasFilter === false && hasSorting === false) {
    return <></>;
  }

  if (hasFilter === false && hasSorting === true) {
    return <SortingComp columnName={columnName} />;
  }

  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 hover:text-accent-foreground h-8 w-8">
          {isLoading ? (
            <ArrowPathIcon className="size-4 text-white animate-spin" />
          ) : (
            <FunnelIcon className="size-4 text-white" />
          )}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-black/10 bg-white p-1 text-sm/6 text-black/80 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 font-poppins dark:bg-background-dark dark:border-background-light/10 mt-2 max-h-[400px] min-h-[300px]"
        >
          {hasSorting && (
            <>
              <MenuItem>
                <button
                  onClick={sortColumn}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light justify-between"
                >
                  <span>Order by (Z to A)</span>{" "}
                  <BarsArrowUpIcon className="size-4" />{" "}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={sortColumn}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light justify-between"
                >
                  <span>Order by (A to Z)</span>{" "}
                  <BarsArrowDownIcon className="size-4" />{" "}
                </button>
              </MenuItem>
            </>
          )}
          <div className="my-1 h-px bg-white/5" />
          {hasFilter && (
            <MenuItem>
              <>
                <div className="flex justify-between p-2">
                  <button
                    onClick={clearFilters}
                    className="text-white underline hover:no-underline  "
                  >
                    Clear
                  </button>
                  <button
                    onClick={applyFilters}
                    className="text-white underline hover:no-underline "
                  >
                    Apply
                  </button>
                </div>
                <MultiSelectComp
                  options={options}
                  onChange={setSelectedFilters}
                  placeholder="Search..."
                />
              </>
            </MenuItem>
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}

function SortingComp({ columnName = "" }) {
  const [isAscending, setIsAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchProfiles } = usePivotTableStore();

  async function sortColumn() {
    setIsLoading(true);
    await fetchProfiles({
      sortColumn: columnName,
      sortOrder: isAscending ? "asc" : "desc",
    });
    setIsAscending(!isAscending);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="group flex items-center gap-2 rounded-lg p-2  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light justify-between">
        <ArrowPathIcon className="size-4  animate-spin" />
      </div>
    );
  }

  return (
    <button
      onClick={sortColumn}
      className="group flex items-center gap-2 rounded-lg p-2  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light justify-between"
    >
      {isAscending ? (
        <BarsArrowDownIcon className="size-4" />
      ) : (
        <BarsArrowUpIcon className="size-4" />
      )}
    </button>
  );
}

import { useUserTableStore } from "@/context/UserTableContexts";

export default function ResetTable() {
  const { resetColumns } = useUserTableStore();

  return (
    <>
      <button
        onClick={resetColumns}
        className="group flex w-fit items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/30 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-[#2DB475]"
      >
        Reset
      </button>
    </>
  );
}

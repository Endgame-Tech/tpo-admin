export default function Pagination({
  currentPage,
  pageSize,
  dataLength,
  onClick,
}: PaginationProps) {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = dataLength < pageSize;

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={isPreviousDisabled}
        className="inline-flex text-white items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
      >
        Previous
      </button>

      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={isNextDisabled}
        className="inline-flex text-white items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
      >
        Next
      </button>
    </div>
  );
}

import { useState, FormEvent, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounceValue } from "@/lib/useDebouncer";
import useGetAutocompleteResult from "@/lib/useGetAutocompleteResult";
import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useResourceTableStore } from "@/context/ResourceTableContext";

type Suggestions = {
  title: string;
  sub_title: string;
  author: string;
  resource_id?: string;
};

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const debounceSearch = useDebounceValue(search);
  const { data, isLoading, error } = useGetAutocompleteResult<Suggestions>(debounceSearch, 'resources');
  const { updateSearch } = useResourceTableStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearch(search);
  };

  useEffect(() => {
    setSuggestions(data);
  }, [data]);

  function closeSearchResult() {
    setSuggestions([]);
  }

  return (
    <form
      id="search"
      method="GET"
      action="/search"
      className="flex w-full gap-1 relative border-b"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        id="search"
        className={`  p-2 w-full outline-none bg-transparent text-white `}
        placeholder="Search for resources"
        value={search}
      />
      <button
        className={`  p-2 text-primary outline-none rounded-r`}
        title="search"
      >
        <MagnifyingGlassIcon className="size-6 text-white" />
      </button>

      <SearchResult
        suggestions={suggestions}
        isLoading={isLoading}
        error={error}
        closeSearchResult={closeSearchResult}
      />
    </form>
  );
}

type Props = {
  suggestions: Suggestions[];
  isLoading: boolean;
  error: string | null;
  closeSearchResult: () => void;
};

function SearchResult({
  suggestions,
  isLoading,
  error,
  closeSearchResult,
}: Props) {
  const parentRef = useRef<any>(null);
  useOnClickOutside(parentRef, () => {
    closeSearchResult();
  });

  const {updateColumnFilter} = useResourceTableStore()

  function onSelectResource(suggestion: Suggestions) {
    updateColumnFilter('Title', [suggestion.title]);
    updateColumnFilter('Sub Title', [suggestion.sub_title]);
    updateColumnFilter('Author', [suggestion.author]);
    closeSearchResult();
  }

  if (isLoading) {
    return (
      <div
        className={`absolute top-12 right-0 max-h-[300px] min-w-[300px] rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10`}
      >
        <ArrowPathIcon className="size-4 text-white  animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div
        className={`absolute top-12 right-0 max-h-[300px] min-w-[300px] rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10`}
      >
        error
      </div>
    );
  }

  if (suggestions.length <= 0) {
    return <></>;
  }
  return (
    <div
      className={`absolute top-12 right-0 max-h-[300px] min-w-[300px] rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10 `}
      ref={parentRef}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.resource_id}
          className={`px-2 py-2 border-b border-white/20 text-left hover:bg-white/10 flex gap-2 flex-col`}
          onClick={() => {
            onSelectResource(suggestion);
          }}
        >
          <h1 className=" whitespace-nowrap">{suggestion?.title}</h1>
          <p className=" whitespace-nowrap text-sm opacity-75">
            {" "}
            {suggestion?.sub_title}
          </p>
          <p className=" whitespace-nowrap text-xs opacity-50">
            by {suggestion?.author}
          </p>
        </button>
      ))}
    </div>
  );
}

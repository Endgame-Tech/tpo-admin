import { useState, FormEvent, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounceValue } from "@/lib/useDebouncer";
import useGetAutocompleteResult from "@/lib/useGetAutocompleteResult";
import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useUserTableStore } from "@/context/UserTableContexts";

type Suggestions = {
  first_name: string;
  middle_name: string;
  last_name: string;
  user_id: string;
  email: string;
};

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const debounceSearch = useDebounceValue(search);
  const { data, isLoading, error } = useGetAutocompleteResult<Suggestions>(
    debounceSearch,
    "users"
  );

  const { updateSearch } = useUserTableStore();

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
        placeholder="Search for user"
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

  const { updateColumnFilter } = useUserTableStore();

  function onSelectUser(suggestion: Suggestions) {
    updateColumnFilter("Email", [suggestion.email]);
    closeSearchResult();
  }
  
  if (isLoading) {
    return (
      <div
        className={`absolute top-12 right-0 max-h-[300px] min-w-fit rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10`}
      >
        <ArrowPathIcon className="size-4 text-white  animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div
        className={`absolute top-12 right-0 max-h-[300px] min-w-fit rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10`}
      >
        {error}
      </div>
    );
  }

  if (suggestions.length <= 0) {
    return <></>;
  }
  return (
    <div
      className={`absolute top-12 right-0 max-h-[300px] min-w-fit  rounded bg-background-dark border-2 border-white/30 text-text-dark w-full overflow-auto flex flex-col z-10`}
      ref={parentRef}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.user_id}
          className={`px-2 py-2 border-b border-white/20 text-left hover:bg-white/10`}
          onClick={() => {
            onSelectUser(suggestion);
          }}
        >
          <h1 className=" ">
            {suggestion?.first_name} {suggestion?.middle_name}{" "}
            {suggestion?.last_name}{" "}
          </h1>
        </button>
      ))}
    </div>
  );
}

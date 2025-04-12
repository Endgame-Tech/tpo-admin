import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const autocompleteFunctions = {
  resources: resourceAutocompleteResult,
  users: usersAutocompleteResult,
};

function useGetAutocompleteResult<T>(
  search: string,
  fetchType: keyof typeof autocompleteFunctions
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchResults = autocompleteFunctions[fetchType];

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    (async function fetchData() {
      try {
        if (search.length <= 0) {
          setData([]);
          setIsLoading(false);
          return;
        }
        const { data, error } = await fetchResults(search);
        
        if (error) {
          throw new Error("Network response was not ok");
        }

        const newData = data || [];

        if (!ignore) {
          setData(newData as T[]);
          setIsLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        setIsLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [search, fetchResults]);

  return { data, isLoading, error };
}

export default useGetAutocompleteResult;

async function resourceAutocompleteResult(search: string) {
  const { data, error } = await supabase
    .from("resources")
    .select("resource_id, title, sub_title, author")
    .or(
      `title.ilike.%${search}%, sub_title.ilike.%${search}%, author.ilike.%${search}%`
    )
    .limit(5);

  return { data, error };
}

async function usersAutocompleteResult(search: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("first_name, middle_name, last_name, user_id, email")
    .or(
      `first_name.ilike.%${search}%, last_name.ilike.%${search}%, email.ilike.%${search}%, middle_name.ilike.%${search}%`
    )
    .limit(5);    
  return { data, error };
}

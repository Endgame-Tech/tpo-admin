import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/Toast";

type UseSupabaseDataProps = {
  func: string;
  args?: Record<string, any>
};

export function useSupabaseRPC<T>({ func, args }: UseSupabaseDataProps) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Memoize args so that useEffect doesn't rerun unnecessarily
  const memoizedArgs = useMemo(() => args, [JSON.stringify(args)]);
  // console.log(memoizedArgs);
  
  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc(func, memoizedArgs);

    if (error) {
      addToast(`Error fetching grouped data:${error?.message}`, "error");
      setError(`Error fetching grouped data:${error?.message}`);
      setData(null);
    } else {
      setData(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [func, memoizedArgs]);

  return { data, isLoading, error, refetch: fetchData }; // Return refetch function
}

import { useState, useEffect } from "react";
export function useDebounceValue(value: string, time = 300) {
    const [debounceValue, setDebounceValue] = useState(value);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebounceValue(value);
      }, time);
  
      return () => {
        clearTimeout(timeout);
      };
    }, [value, time]);
  
    return debounceValue;
  }
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";

export function useUrlState<T>(params: {
  initialState: T;
  paramName?: string;
}): [T, (state: Partial<T>) => void] {
  const serialize = (state: T) => btoa(JSON.stringify(state));
  const deserialize = (state: string) => JSON.parse(atob(state)) as T;

  const { initialState, paramName = "q" } = params;
  const [search, setSearch] = useSearchParams();

  const existingValue = search.get(paramName);
  const [state, setInternalState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setInternalState(deserialize(existingValue));
    }
  }, [existingValue]);

  const setState = (s: Partial<T>) => {
    setInternalState((prev) => {
      const newState = { ...prev, ...s };
      const searchParams = new URLSearchParams();
      searchParams.set(paramName, serialize(newState));
      setSearch(searchParams);
      return newState;
    });
  };

  return [state, setState];
}

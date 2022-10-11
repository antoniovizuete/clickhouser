import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";

const serialize = <T>(state: T): string => btoa(JSON.stringify(state));
const deserialize = <T>(state: string, defaultState: T): T => {
  try {
    return JSON.parse(atob(state)) as T;
  } catch (e) {
    return defaultState;
  }
};

export function useUrlState<T>(params: {
  initialState: T;
  paramName?: string;
}): [T, (state: Partial<T>) => void] {
  const { initialState, paramName = "q" } = params;
  const [search, setSearch] = useSearchParams();

  const existingValue = search.get(paramName);
  const [state, setInternalState] = useState<T>(
    existingValue ? deserialize(existingValue, initialState) : initialState
  );

  useEffect(() => {
    if (existingValue && deserialize(existingValue, initialState) !== state) {
      setInternalState(deserialize(existingValue, initialState));
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

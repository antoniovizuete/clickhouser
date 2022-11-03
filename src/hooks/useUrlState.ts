import { decode, encode } from "js-base64";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type UrlState = {
  jsonParams?: string;
  query?: string;
  serverAddress: string;
  username: string;
  name: string;
};

const SEPARATOR = ".";

export default function debounce(
  func: (args: unknown[]) => void,
  msWait: number
) {
  let timeout: NodeJS.Timeout;
  return function (...args: unknown[]) {
    // @ts-ignore
    const context = this as unknown;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, [args]), msWait);
  };
}

const serialize = ({
  serverAddress,
  username,
  jsonParams,
  query,
  name,
}: UrlState): string =>
  [
    encode(jsonParams ?? ""),
    encode(query ?? ""),
    encode(serverAddress),
    encode(username),
    encode(name),
  ].join(SEPARATOR);

const deserialize = (
  encodedState: string,
  defaultState: UrlState
): UrlState => {
  const [jsonParams, query, serverAddress, username, name] = encodedState
    .split(SEPARATOR)
    .map(decode);

  return {
    jsonParams: jsonParams ?? defaultState.jsonParams,
    query: query ?? defaultState.query,
    serverAddress: serverAddress ?? defaultState.serverAddress,
    username: username ?? defaultState.username,
    name: name ?? defaultState.name,
  };
};

export function useUrlState(params: {
  initialState: UrlState;
  paramName?: string;
}): [UrlState, (state: Partial<UrlState>) => void] {
  const { initialState, paramName = "q" } = params;
  const [search, setSearch] = useSearchParams();

  const existingValue = search.get(paramName);
  const [state, setInternalState] = useState<UrlState>(
    existingValue ? deserialize(existingValue, initialState) : initialState
  );

  useEffect(() => {
    if (existingValue && deserialize(existingValue, initialState) !== state) {
      setInternalState(deserialize(existingValue, initialState));
    }
  }, [existingValue]);

  const setState = (s: Partial<UrlState>) => {
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

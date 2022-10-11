import { useCallback, useState } from "react";
import { useUrlState } from "./useUrlState";
import { performQuery } from "../lib/peform-query";
import { QueryFormProps } from "../components/QueryForm";
import { useHotKeys } from "./useHotKeys";

export type UrlState = {
  query?: string;
  serverAddress: string;
  username: string;
  jsonParams?: string;
};

export const initialState: UrlState = {
  query: "SELECT 1",
  serverAddress: "http://localhost:8123/",
  username: "default",
  jsonParams: '{\n  "param1": "value1",\n  "param2": "value2"\n}',
};

export const useQueryForm = ({
  onSuccess,
  onError,
  onPerformQuery,
}: QueryFormProps) => {
  const [urlState, setUrlState] = useUrlState<UrlState>({
    initialState,
  });

  const [password, setPassword] = useState("");

  const runQuery = useCallback(async () => {
    onPerformQuery?.();
    const { error, result } = await performQuery({ ...urlState, password });
    if (error) {
      onError?.(error);
    }
    if (result) {
      onSuccess?.(result);
    }
  }, [onError, onSuccess, onPerformQuery, password, performQuery, urlState]);

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () => runQuery(),
      deps: [runQuery, urlState, password],
    },
    {
      combo: "alt+h, option+h",
      description: "Show this help",
      help: true,
    },
  ]);

  return {
    HotKeysHelpDialog,
    openHelpDialog,
    runQuery,
    setUrlState,
    urlState,
    password,
    setPassword,
  };
};

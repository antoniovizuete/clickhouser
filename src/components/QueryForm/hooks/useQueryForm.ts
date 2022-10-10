import { useCallback, useState } from "react";
import { useUrlState } from "../../../hooks/useUrlState";
import { QueryFormProps } from "../QueryForm";
import { useHotKeys } from "./useHotKeys";
import { useRunQuery } from "./useRunQuery";

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
  const { runQuery } = useRunQuery();
  const [urlState, setUrlState] = useUrlState<UrlState>({
    initialState,
  });

  const [password, setPassword] = useState("");

  const performQuery = useCallback(async () => {
    onPerformQuery?.();
    const { error, result } = await runQuery({ ...urlState, password });
    if (error) {
      onError?.(error);
    }
    if (result) {
      onSuccess?.(result);
    }
  }, [onError, onSuccess, onPerformQuery, password, runQuery, urlState]);

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () => performQuery(),
      deps: [performQuery, urlState, password],
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
    performQuery,
    setUrlState,
    urlState,
    password,
    setPassword,
  };
};

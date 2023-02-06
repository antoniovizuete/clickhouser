import { useCallback, useState } from "react";
import { UrlState, useUrlState } from "./useUrlState";
import { QueryFormProps } from "../components/QueryForm";
import { useHotKeys } from "./useHotKeys";
import { usePasswordContext } from "../contexts/usePasswordContext";
import { useConnectionContext } from "../contexts/useConnectionContext";
import {
  performQuery,
  transformConnectionToConnectionParams,
} from "../lib/clickhouse-clients";

export const initialState: UrlState = {
  query: "SELECT 1",
  jsonParams: '{\n  "param1": "value1",\n  "param2": "value2"\n}',
  name: "Untitled query",
};

export const useQueryForm = ({
  onSuccess,
  onError,
  onPerformQuery,
}: QueryFormProps) => {
  const [urlState, setUrlState] = useUrlState({
    initialState,
  });

  const { password } = usePasswordContext();
  const { getActiveConnection } = useConnectionContext();

  const runQuery = useCallback(async () => {
    onPerformQuery?.();
    const connection = getActiveConnection();

    if (!connection) {
      onError?.("No active connection");
      return;
    }
    const connectionParams = transformConnectionToConnectionParams(connection);
    const { error, result } = await performQuery({
      ...connectionParams,
      ...urlState,
      password,
    });
    if (error) {
      onError?.(error);
    }
    if (result) {
      onSuccess?.(result);
    }
  }, [
    onError,
    onSuccess,
    onPerformQuery,
    password,
    performQuery,
    urlState,
    getActiveConnection,
  ]);

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
  };
};

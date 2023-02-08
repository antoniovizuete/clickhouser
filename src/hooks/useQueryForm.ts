import { useCallback } from "react";
import { QueryFormProps } from "../components/QueryForm";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { performQuery } from "../lib/clickhouse-clients";
import { useHotKeys } from "./useHotKeys";
import { UrlState, useUrlState } from "./useUrlState";

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

  const { getActiveConnection } = useConnectionContext();

  const runQuery = useCallback(async () => {
    onPerformQuery?.();
    const connection = getActiveConnection();

    if (!connection) {
      onError?.("No active connection");
      return;
    }

    const { error, result } = await performQuery({
      ...connection,
      query: urlState.query,
      jsonParams: urlState.jsonParams,
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
    performQuery,
    urlState,
    getActiveConnection,
  ]);

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () => runQuery(),
      deps: [runQuery, urlState, getActiveConnection],
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

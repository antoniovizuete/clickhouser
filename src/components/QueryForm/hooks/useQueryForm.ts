import { useRef } from "react";
import { EditorRef } from "../components/Editor";
import { QueryFormProps } from "../QueryForm";
import { useQueryFormContext } from "../QueryForm.context";
import { useHotKeys } from "./useHotKeys";
import { RunQueryParams, useRunQuery } from "./useRunQuery";

export const useQueryForm = ({
  onSuccess,
  onError,
  onPerformQuery,
}: QueryFormProps) => {
  const { dispatch, state } = useQueryFormContext();
  const { runQuery } = useRunQuery();

  const queryEditorRef = useRef<EditorRef>(null);
  const paramsEditorRef = useRef<EditorRef>(null);

  const performQuery = async (params: RunQueryParams) => {
    onPerformQuery?.();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { error, result } = await runQuery(params);
    if (error) {
      onError?.(error);
    }
    if (result) {
      onSuccess?.(result);
    }
  };

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () =>
        performQuery({ query: state.query, jsonParams: state.jsonParams }),
      deps: [performQuery],
    },
    {
      combo: "alt+h, option+h",
      description: "Show this help",
      help: true,
    },
  ]);

  return {
    queryEditorRef,
    paramsEditorRef,
    HotKeysHelpDialog,
    openHelpDialog,
    performQuery,
    dispatch,
    state,
  };
};

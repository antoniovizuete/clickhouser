import { useCallback } from "react";
import { performQuery, QueryResult } from "../../../lib/peform-query";
import { useQueryFormContext } from "../QueryForm.context";
import { Actions } from "../QueryForm.reducer";

export type RunQueryParams = {
  query?: string;
  jsonParams?: string;
};

type ReturnType = {
  error: string | undefined;
  loading: boolean;
  result: QueryResult | undefined;
};

export const useRunQuery = () => {
  const { state, dispatch } = useQueryFormContext();

  const runQuery = useCallback(
    async ({ query, jsonParams }: RunQueryParams): Promise<ReturnType> => {
      const { serverAddress, username, password } = state;

      if (!query) {
        return {
          error: "Query is empty",
          loading: false,
          result: undefined,
        };
      }

      try {
        const result = await performQuery({
          query,
          serverAddress,
          username,
          password,
          jsonParams,
        });
        return {
          error: undefined,
          loading: false,
          result,
        };
      } catch (e) {
        return {
          error: e as string,
          loading: false,
          result: undefined,
        };
      }
    },
    [state, dispatch]
  );

  return { runQuery };
};

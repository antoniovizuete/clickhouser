import { performQuery, QueryResult } from "../../../lib/peform-query";

export type RunQueryParams = {
  query?: string;
  jsonParams?: string;
  serverAddress?: string;
  username?: string;
  password?: string;
};

type ReturnType = {
  error: string | undefined;
  loading: boolean;
  result: QueryResult | undefined;
};

export const useRunQuery = () => {
  const runQuery = async ({
    serverAddress,
    username = "default",
    password = "",
    query,
    jsonParams,
  }: RunQueryParams): Promise<ReturnType> => {
    if (!query) {
      return {
        error: "Query is empty",
        loading: false,
        result: undefined,
      };
    }

    if (!serverAddress) {
      return {
        error: "Server address is empty",
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
  };

  return { runQuery };
};

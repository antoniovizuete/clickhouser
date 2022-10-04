import { useState } from "react";
import { performQuery } from "../../lib/peform-query";
import { QueryFormParams } from "./types";

type QueryFormHookParams = QueryFormParams & {
  defaults?: {
    query?: string;
    username?: string;
    password?: string;
    serverAddress?: string;
  };
};

export const useQueryForm = ({
  defaults = {},
  onSuccess,
  onError,
  onQuery,
}: QueryFormHookParams) => {
  const [query, setQuery] = useState<string | undefined>(defaults.query);
  const [serverAddress, setServerAddress] = useState<string | undefined>(
    defaults.serverAddress
  );
  const [username, setUsername] = useState<string | undefined>(
    defaults.username
  );
  const [password, setPassword] = useState<string | undefined>(
    defaults.password
  );

  const runQuery = async () => {
    if (query && serverAddress && username) {
      try {
        onQuery?.(true);
        const response = await performQuery({
          serverAddress: serverAddress ?? "http://localhost:8123/",
          username: username ?? "default",
          password: password ?? "",
          query: query ?? "",
        });
        onSuccess(response);
      } catch (e) {
        onError(e as string);
      } finally {
        onQuery?.(false);
      }
    } else {
      onSuccess(undefined);
    }
  };

  return {
    query,
    setQuery,
    serverAddress,
    setServerAddress,
    username,
    setUsername,
    password,
    setPassword,
    runQuery,
  };
};

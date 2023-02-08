import { checkUrl, transformConnectionToConnectionParams } from "../helpers";
import { parseResponse, serializeParamValue } from "./helpers";
import { Params, QueryResult } from "./types";

type ReturnType = {
  error?: string;
  result?: QueryResult;
};

export async function performQuery({
  query,
  jsonParams = "{}",
  ...connection
}: Params): Promise<ReturnType> {
  if (!query) {
    return {
      error: "Query is empty",
    };
  }

  const { serverAddress, username, password } =
    transformConnectionToConnectionParams(connection);

  const promise = new Promise<QueryResult>((resolve, reject) => {
    const userParams: string[] = [];
    try {
      userParams.push(
        ...Object.entries(JSON.parse(jsonParams || "{}")).map(
          ([key, value]) => {
            return `param_${key}=${encodeURIComponent(
              serializeParamValue(value)
            )}`;
          }
        )
      );
    } catch (error) {
      return reject("Invalid JSON params");
    }
    const queryParams = [
      "add_http_cors_header=1",
      `user=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password || "")}`,
      "default_format=JSONCompact",
      "max_result_rows=1000",
      "max_result_bytes=10000000",
      "result_overflow_mode=break",
      ...userParams,
    ].join("&");

    const url = [serverAddress, queryParams].join(
      serverAddress.indexOf("?") >= 0 ? "&" : "?"
    );

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          resolve(parseResponse(this.responseText));
        } else if (this.status === 401) {
          reject("Unauthorized");
        } else if (this.status === 403) {
          reject("Forbidden");
        } else if (this.status === 0) {
          reject("Connection error");
        } else {
          reject(this.responseText);
        }
      }
    };

    xhr.onerror = function () {
      reject("Network error");
    };

    try {
      xhr.send(query);
    } catch (e) {
      reject((e as Error).message);
    }
  });

  try {
    const response = await promise;
    return {
      error: undefined,
      result: response,
    };
  } catch (e) {
    return {
      error: e as string,
      result: undefined,
    };
  }
}

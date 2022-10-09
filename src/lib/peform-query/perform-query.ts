import { Params, QueryResult } from "./types";

const parseResponse = (response: string): QueryResult => {
  try {
    return JSON.parse(response);
  } catch (e) {
    return { value: response };
  }
};

export function performQuery({
  query,
  username,
  password,
  serverAddress,
  jsonParams = "{}",
}: Params): Promise<QueryResult> {
  return new Promise((resolve, reject) => {
    const queryParams = [
      "add_http_cors_header=1",
      `user=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password)}`,
      "default_format=JSONCompact",
      "max_result_rows=1000",
      "max_result_bytes=10000000",
      "result_overflow_mode=break",
      ...Object.entries(JSON.parse(jsonParams)).map(
        ([key, value]) => `param_${key}=${encodeURIComponent(String(value))}`
      ),
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
}

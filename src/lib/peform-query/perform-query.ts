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
  params,
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
      ...params.map(
        (param) => `param_${param.key}=${encodeURIComponent(param.value)}`
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
        } else {
          reject(this.responseText);
        }
      }
    };

    xhr.send(query);
  });
}

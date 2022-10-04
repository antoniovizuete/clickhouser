import { QueryResult, StringResult } from "./types";

export const isStringResult = (
  result?: QueryResult
): result is StringResult => {
  return (result as StringResult)?.value !== undefined;
};

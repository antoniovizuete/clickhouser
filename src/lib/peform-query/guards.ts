import { JsonResult, QueryResult, StringResult } from "./types";

export const isStringResult = (
  result?: QueryResult
): result is StringResult => {
  return (result as StringResult)?.value !== undefined;
};

export const isJsonResult = (result?: QueryResult): result is JsonResult => {
  return (result as JsonResult)?.data !== undefined;
};

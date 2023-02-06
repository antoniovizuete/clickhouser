import { JsonResult, MessageResult, QueryResult, StringResult } from "./types";

export const isStringResult = (
  result?: QueryResult
): result is StringResult => {
  return (result as StringResult)?.value !== undefined;
};

export const isJsonResult = (result?: QueryResult): result is JsonResult => {
  return (result as JsonResult)?.data !== undefined;
};

export const isMessageResult = (
  result?: QueryResult
): result is MessageResult => {
  return (result as MessageResult)?.message !== undefined;
};

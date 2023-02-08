import { ConnectionBody } from "../types";

export type Params = ConnectionBody & {
  query?: string;
  jsonParams?: string;
};

export type MessageResult = {
  message: string;
};

export type StringResult = {
  value: string;
};

export type JsonResult = {
  data: (string | number | boolean)[][];
  //| Record<string, string | number | boolean>[];
  meta: {
    name: string;
    type: string;
  }[];
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
};

export type Statistics = {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
};

export type QueryResult = StringResult | JsonResult | MessageResult;

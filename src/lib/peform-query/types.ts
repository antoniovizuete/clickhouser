export type Params = {
  query: string;
  username: string;
  password: string;
  serverAddress: string;
  jsonParams?: string;
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
  statistics: {
    elapsed: number;
    rows_read: number;
    bytes_read: number;
  };
};

export type QueryResult = StringResult | JsonResult;

import { QueryResult } from "../../lib/peform-query";

export type QueryFormParams = {
  onSuccess: (result?: QueryResult) => void;
  onError: (error: string) => void;
  onQuery?: (loading: boolean) => void;
};

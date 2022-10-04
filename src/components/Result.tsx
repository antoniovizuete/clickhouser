import { NonIdealState, Spinner } from "@blueprintjs/core";
import { isStringResult, QueryResult } from "../lib/peform-query";
import TableResult from "./TableResult";

type Params = {
  result: QueryResult | undefined;
  error: string | undefined;
  loading: boolean;
};

export default function Result({ result, error, loading }: Params) {
  if (error) {
    return <NonIdealState title="Error" description={error} icon="error" />;
  }

  if (loading) {
    return <NonIdealState title="Querying..." icon={<Spinner />} />;
  }

  if (!result) {
    return (
      <NonIdealState
        icon="search"
        title="Clickhouser"
        description="ClickHouse query runner"
      />
    );
  }

  if (isStringResult(result)) {
    return <pre>{result.value}</pre>;
  }

  return <TableResult result={result} />;
}

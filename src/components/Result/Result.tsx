import { NonIdealState, Spinner } from "@blueprintjs/core";
import { isStringResult, QueryResult } from "../../lib/peform-query";
import TableResult from "./TableResult";

type Params = {
  result: QueryResult | undefined;
  error: string | undefined;
  loading: boolean;
};

export default function Result({ result, error, loading }: Params) {
  if (error) {
    return (
      <div className="overflow-auto h-full flex flex-col gap-5 p-5">
        <NonIdealState
          className="w-full h-fit"
          title="Error"
          layout={"horizontal"}
          icon="error"
        />
        <div className="font-mono text-red-700">{error}</div>
      </div>
    );
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

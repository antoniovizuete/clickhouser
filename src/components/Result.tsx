import { Icon, NonIdealState, Spinner } from "@blueprintjs/core";
import { useTheme } from "../contexts/useTheme";
import { isStringResult, QueryResult } from "../lib/peform-query";
import { isMessageResult } from "../lib/peform-query/guards";
import Brand from "./Brand";
import TableResult from "./TableResult";

type Params = {
  result: QueryResult | undefined;
  error: string | undefined;
  loading: boolean;
};

export default function Result({ result, error, loading }: Params) {
  const { theme, bpTheme } = useTheme();
  if (error) {
    return (
      <div className="overflow-auto h-full flex flex-col gap-5 p-5 justify-center items-center ">
        <NonIdealState
          className={`w-full h-fit ${bpTheme}`}
          title={
            <span className="text-2xl text-red-700 dark:text-red-400">
              Error
            </span>
          }
          icon={
            <Icon
              icon="warning-sign"
              iconSize={80}
              className={bpTheme}
              color="rgb(248 113 113)"
            />
          }
        />
        <div className="font-mono text-red-700 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (loading) {
    return <NonIdealState title="Querying..." icon={<Spinner />} />;
  }

  if (!result) {
    return (
      <NonIdealState
        className={`${bpTheme}`}
        icon={<Icon icon="search" iconSize={80} className={bpTheme} />}
        title={<Brand />}
        description={
          <span className="dark:text-gray-400">ClickHouse query runner</span>
        }
      />
    );
  }

  if (isStringResult(result)) {
    return <pre>{result.value}</pre>;
  }

  if (isMessageResult(result)) {
    return (
      <NonIdealState
        title={<span className="dark:text-gray-400">{result.message}</span>}
        icon={
          <Icon
            icon="tick"
            iconSize={80}
            className={bpTheme}
            color="rgb(0 255 0)"
            intent="success"
          />
        }
      />
    );
  }
  if (result.data.length === 0) {
    return (
      <NonIdealState
        title={<span className="dark:text-gray-400">No results</span>}
        icon={
          <Icon
            icon="high-priority"
            iconSize={80}
            className={bpTheme}
            color="rgb(255 200 0)"
            intent="warning"
          />
        }
      />
    );
  }

  return <TableResult result={result} />;
}

import {
  NonIdealState,
  NonIdealStateIconSize,
  Spinner,
} from "@blueprintjs/core";

import { useEffect, useState } from "react";
import { isStringResult, QueryResult } from "../lib/peform-query";
import "../styles/App.css";
import QueryForm from "./QueryForm";

export default function App() {
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(result);
  }, [result]);
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="h-full w-full">
      <div>
        <QueryForm
          onSuccess={setResult}
          onError={setError}
          onQuery={setLoading}
        />
      </div>

      {!result && !error && (
        <NonIdealState
          icon={loading ? <Spinner /> : "search"}
          title="Clickhouser"
          description="Clickhouse query runner"
        />
      )}
      {error && (
        <NonIdealState icon="error" title="Error" description={error} />
      )}
      {isStringResult(result) ? (
        <div>{result.value}</div>
      ) : (
        <ul>
          {result?.data.map((e, i) => (
            <li key={1}>{JSON.stringify(e)}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

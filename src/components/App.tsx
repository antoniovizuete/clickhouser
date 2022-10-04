import { useState } from "react";
import { QueryResult } from "../lib/peform-query";
import "../styles/App.css";
import QueryForm from "./QueryForm";
import Result from "./Result";

export default function App() {
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleOnSuccess = (result?: QueryResult) => {
    setResult(result);
    setError(undefined);
    setLoading(false);
  };

  const handleOnError = (error: string) => {
    setResult(undefined);
    setError(error);
    setLoading(false);
  };

  return (
    <main className="h-full w-full">
      <QueryForm
        onSuccess={handleOnSuccess}
        onError={handleOnError}
        onQuery={setLoading}
      />
      <Result result={result} error={error} loading={loading} />
    </main>
  );
}

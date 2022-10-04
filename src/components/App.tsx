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
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <QueryForm
            onSuccess={handleOnSuccess}
            onError={handleOnError}
            onQuery={setLoading}
          />
        </div>
        <div className="h-full">
          <Result result={result} error={error} loading={loading} />
        </div>
      </div>
    </main>
  );
}

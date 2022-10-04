import { useState } from "react";
import { QueryResult } from "../lib/peform-query";
import "../styles/App.css";
import QueryForm from "./QueryForm";
import Result from "./Result";

export default function App() {
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  return (
    <main className="h-full w-full">
      <QueryForm
        onSuccess={setResult}
        onError={setError}
        onQuery={setLoading}
      />

      <Result result={result} error={error} loading={loading} />
    </main>
  );
}

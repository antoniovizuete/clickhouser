import { Allotment } from "allotment";
import { useRef, useState } from "react";

import { QueryResult } from "../lib/peform-query";
import "../styles/App.css";
import Footer from "./Footer";
import MonacoWrapper from "./MonacoWrapper";
import QueryForm from "./QueryForm";
import { EditorRef } from "./QueryForm/components/Editor";
import Result from "./Result";

export default function App() {
  const [result, setResult] = useState<QueryResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const paramsEditorRef = useRef<EditorRef>(null);

  const handleOnSuccess = (result?: QueryResult) => {
    setResult(result);
    setError(undefined);
    setLoading(false);
  };

  const handleOnError = (error?: string) => {
    setResult(undefined);
    setError(error);
    setLoading(false);
  };

  return (
    <MonacoWrapper jsonParams={paramsEditorRef.current?.getValue()}>
      <Allotment vertical>
        <Allotment.Pane minSize={100}>
          <QueryForm
            onSuccess={handleOnSuccess}
            onError={handleOnError}
            onPerformQuery={() => setLoading(true)}
            paramsEditorRef={paramsEditorRef}
          />
        </Allotment.Pane>
        <Allotment.Pane>
          <Result result={result} error={error} loading={loading} />
        </Allotment.Pane>
        <Allotment.Pane maxSize={24} minSize={24} className="p-0">
          <Footer />
        </Allotment.Pane>
      </Allotment>
    </MonacoWrapper>
  );
}

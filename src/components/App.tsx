import {
  Button,
  ControlGroup,
  InputGroup,
  NonIdealState,
} from "@blueprintjs/core";

import { useState } from "react";
import { isStringResult, performQuery } from "../lib/peform-query";
import "../styles/App.css";
import Editor from "./Editor";

export default function App() {
  const [sql, setSql] = useState<string | undefined>("SELECT 1");
  const [server, setServer] = useState<string | undefined>(
    "http://localhost:8123/"
  );
  const [user, setUser] = useState<string | undefined>("default");
  const [password, setPassword] = useState<string | undefined>("");
  const [result, setResult] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleRunQuery = async () => {
    if (sql && server && user) {
      try {
        setError(undefined);
        const response = await performQuery({
          serverAddress: server ?? "http://localhost:8123/",
          username: user ?? "default",
          password: password ?? "",
          query: sql ?? "",
        });
        if (isStringResult(response)) {
          setResult(response.value);
        }
      } catch (e) {
        setError(e as string);
        setResult(undefined);
      }
    } else {
      setResult(undefined);
    }
  };

  return (
    <main className="h-full w-full">
      <div>
        <ControlGroup className="mb-1 p-1">
          <InputGroup
            leftIcon="globe-network"
            value={server}
            onChange={(e) => setServer(e.target.value)}
            className="flex-grow"
          />
          <InputGroup
            leftIcon="user"
            defaultValue="default"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <InputGroup
            leftIcon="lock"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            intent="warning"
            text="Run query"
            onClick={handleRunQuery}
            disabled={!sql}
          />
        </ControlGroup>
        <div className="flex flex-row gap-2">
          <div className="w-4/5">
            <Editor value={sql} onChange={setSql} onCmdEnter={handleRunQuery} />
          </div>
          <aside className="w-1/5">Options</aside>
        </div>
        {/*<div >editor here</div>*/}
      </div>

      {!result && !error && (
        <NonIdealState
          icon="search"
          title="Clickhouser"
          description="Clickhouse query runner"
        />
      )}
      {error && (
        <NonIdealState icon="error" title="Error" description={error} />
      )}
      {result && <div>{result}</div>}
    </main>
  );
}

import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

import Editor from "../Editor";
import { QueryFormParams } from "./types";
import { useQueryForm } from "./useQueryForm";

export default function QueryForm(params: QueryFormParams) {
  const {
    serverAddress,
    setServerAddress,
    username,
    setUsername,
    password,
    setPassword,
    query,
    setQuery,
    runQuery,
  } = useQueryForm({
    defaults: {
      serverAddress: "http://localhost:8123/",
      username: "default",
      password: "",
      query: "SELECT 1",
    },
    ...params,
  });

  return (
    <main className="h-full w-full">
      <ControlGroup className="mb-1 p-1">
        <InputGroup
          leftIcon="globe-network"
          value={serverAddress}
          onChange={(e) => setServerAddress(e.target.value)}
          className="flex-grow"
        />
        <InputGroup
          leftIcon="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          onClick={runQuery}
          disabled={!query}
        />
      </ControlGroup>
      <div className="flex flex-row gap-2">
        <div className="flex-grow">
          <Editor value={query} onChange={setQuery} onCmdEnter={runQuery} />
        </div>
        {/*<aside className="w-1/5">Options</aside>*/}
      </div>
    </main>
  );
}

import { Alignment, Button, InputGroup, Navbar } from "@blueprintjs/core";
import { Allotment } from "allotment";
import { QueryResult } from "../../lib/peform-query";

import Editor from "./components/Editor";
import { useQueryForm } from "./hooks/useQueryForm";
import { Actions } from "./QueryForm.reducer";

export type QueryFormProps = {
  onPerformQuery: () => void;
  onSuccess: (result?: QueryResult) => void;
  onError: (error?: string) => void;
};

export default function QueryForm(props: QueryFormProps) {
  const {
    state: { query, password, serverAddress, username, jsonParams },
    dispatch,
    performQuery,
    queryEditorRef,
    paramsEditorRef,
    openHelpDialog,
    HotKeysHelpDialog,
  } = useQueryForm(props);

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane maxSize={48} minSize={48}>
          <Navbar className="mb-2 bg-slate-50">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading className="font-semibold tracking-tight text-[#eca834]">
                Clickhouser
              </Navbar.Heading>
              <InputGroup
                leftIcon="globe-network"
                value={serverAddress}
                placeholder="Server address"
                onChange={(e) =>
                  dispatch({
                    type: Actions.SetServerAddress,
                    payload: e.target.value,
                  })
                }
                className="flex-grow"
                size={40}
              />
              <InputGroup
                leftIcon="user"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: Actions.SetUsername,
                    payload: e.target.value,
                  })
                }
              />
              <InputGroup
                leftIcon="lock"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: Actions.SetPassword,
                    payload: e.target.value,
                  })
                }
              />
              <Button
                className="mx-1"
                icon="play"
                intent="warning"
                aria-label="Run query"
                onClick={() => performQuery({ query, jsonParams })}
                disabled={!query}
              />
              <Button icon="help" onClick={openHelpDialog} />
            </Navbar.Group>
          </Navbar>
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment>
            <Allotment.Pane>
              <div className="py-1 px-3 text-xs">Query</div>
              <Editor
                ref={queryEditorRef}
                language="sql"
                defaultValue={"-- TYPE YOUR SQL HERE"}
                value={query}
                onChange={(query) => {
                  dispatch({ type: Actions.SetQuery, payload: query });
                }}
                onCmdEnter={(editor) => {
                  performQuery({
                    query: editor.getValue(),
                    jsonParams: paramsEditorRef.current?.getValue(),
                  });
                }}
                onOptionH={openHelpDialog}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <div className="py-1 px-3 text-xs">Parameters</div>
              <Editor
                ref={paramsEditorRef}
                language="json"
                value={jsonParams}
                onChange={(jsonParams) =>
                  dispatch({ type: Actions.SetJsonParams, payload: jsonParams })
                }
                onCmdEnter={(editor) => {
                  performQuery({
                    jsonParams: editor.getValue(),
                    query: queryEditorRef.current?.getValue(),
                  });
                }}
                onOptionH={openHelpDialog}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
      {HotKeysHelpDialog}
    </>
  );
}

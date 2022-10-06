import {
  Alignment,
  Button,
  InputGroup,
  Intent,
  Navbar,
  Tag,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { Allotment } from "allotment";
import { useHotkeys } from "react-hotkeys-hook";

import { GitHubIcon } from "../svgs/GitHub";
import Editor from "./components/Editor";
import ParameterDialog from "./components/ParameterDialog";
import ParametersMenu from "./components/ParametersMenu";
import { useHotKeys } from "./hooks/useHotKeys";
import { QueryFormParams } from "./types";
import { useQueryForm } from "./useQueryForm";
import { useQueryFormParamaterHandler } from "./useQueryFormParamaterHandler";

export default function QueryForm(props: QueryFormParams) {
  const {
    serverAddress,
    setServerAddress,
    username,
    setUsername,
    password,
    setPassword,
    query,
    setQuery,
    params,
    setParams,
    runQuery,
  } = useQueryForm({
    defaults: {
      serverAddress: "http://localhost:8123/",
      username: "default",
      password: "",
      query: "SELECT 1",
    },
    ...props,
  });

  const {
    isParameterDialogOpen,
    parameterDialogData,
    closeParameterDialog,
    handleOnConfirmParameterDialog,
    handleOnRemoveParameter,
    handleOnEditParameter,
    handleOnAddParameter,
  } = useQueryFormParamaterHandler({ params, setParams });

  const [HotKeysHelpDialog, openHelpDialog] = useHotKeys([
    {
      combo: "cmd+enter",
      description: "Run query",
      callback: () => {
        runQuery();
      },
      deps: [runQuery],
    },
    {
      combo: "alt+p, option+p",
      description: "Add parameter",
      callback: handleOnAddParameter,
      deps: [handleOnAddParameter],
    },
    {
      combo: "alt+h, option+h",
      description: "Show this help",
      help: true,
    },
  ]);

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane maxSize={48} minSize={48}>
          <Navbar className="mb-2">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading className="font-semibold tracking-tight text-[#eca834]">
                Clickhouser
              </Navbar.Heading>
              <InputGroup
                leftIcon="globe-network"
                value={serverAddress}
                placeholder="Server address"
                onChange={(e) => setServerAddress(e.target.value)}
                className="flex-grow"
                size={40}
              />
              <InputGroup
                leftIcon="user"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputGroup
                leftIcon="lock"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                icon="play"
                intent="warning"
                text="Run query"
                onClick={runQuery}
                disabled={!query}
              />
              <Popover2
                content={
                  <ParametersMenu
                    params={params}
                    onClickAdd={handleOnAddParameter}
                    onClickRemove={handleOnRemoveParameter}
                    onClickEdit={handleOnEditParameter}
                  />
                }
                minimal
                placement="bottom-start"
              >
                <Button icon="variable" intent={Intent.NONE}>
                  Paramertes{" "}
                  {params.length > 0 ? (
                    <Tag minimal round>
                      {params.length}
                    </Tag>
                  ) : (
                    ""
                  )}
                </Button>
              </Popover2>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <a
                href="https://github.com/antoniovizuete/clickhouser"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
              </a>
            </Navbar.Group>
          </Navbar>
        </Allotment.Pane>
        <Allotment.Pane>
          <Editor
            value={query}
            onChange={setQuery}
            onCmdEnter={runQuery}
            onOptionH={openHelpDialog}
            onOptionP={handleOnAddParameter}
          />
        </Allotment.Pane>
      </Allotment>
      <ParameterDialog
        data={parameterDialogData}
        isOpen={isParameterDialogOpen}
        onClose={closeParameterDialog}
        onConfirm={handleOnConfirmParameterDialog}
      />
      {HotKeysHelpDialog}
    </>
  );
}

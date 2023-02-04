import { Alignment, Button, Icon, InputGroup, Navbar } from "@blueprintjs/core";

import { Allotment } from "allotment";
import { useRef, useState } from "react";
import { QueryResult } from "../lib/peform-query";

import Editor, { EditorRef } from "./Editor";
import { useQueryForm } from "../hooks/useQueryForm";
import { Popover2 } from "@blueprintjs/popover2";
import CopyUrlPopover from "./CopyUrlPopover";
import Brand from "./Brand";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useSetTitle } from "../hooks/useSetTitle";
import { useTheme } from "../contexts/useTheme";
import { usePasswordContext } from "../contexts/usePassword";
import LoadFileDialog from "./LoadFileDialog";

export type QueryFormProps = {
  onPerformQuery: () => void;
  onSuccess: (result?: QueryResult) => void;
  onError: (error?: string) => void;
  paramsEditorRef: React.RefObject<EditorRef>;
};

export default function QueryForm(props: QueryFormProps) {
  const { paramsEditorRef } = props;
  const runQueryButtonRef = useRef<Button>(null);
  const { password, setPassword } = usePasswordContext();
  const {
    urlState: { query, serverAddress, username, jsonParams, name },
    setUrlState,
    runQuery,
    openHelpDialog,
    HotKeysHelpDialog,
  } = useQueryForm(props);

  const [, setTitle] = useSetTitle(name);
  const { bpTheme, toggleTheme } = useTheme();

  const handleOnChangeName = (e: ContentEditableEvent) => {
    const name = e.target.value.split("<div><br></div>").join("");
    setUrlState({ name });
    setTitle(name);
  };

  const clickOnRunQueryButton = () => {
    runQueryButtonRef.current?.buttonRef?.click();
  };

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane maxSize={48} minSize={48}>
          <Navbar className="mb-2 bg-slate-50 dark:bg-neutral-800 dark:text-white">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>
                <Brand />
              </Navbar.Heading>
              <div className="flex items-center gap-1">
                <InputGroup
                  className={`flex-grow ${bpTheme}`}
                  leftIcon="globe-network"
                  value={serverAddress}
                  placeholder="Server address"
                  onChange={(e) =>
                    setUrlState({ serverAddress: e.target.value })
                  }
                  size={40}
                />
                <InputGroup
                  className={bpTheme}
                  leftIcon="user"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUrlState({ username: e.target.value })}
                />
                <InputGroup
                  className={bpTheme}
                  leftIcon="lock"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-start items-center ml-1 gap-1">
                <Button
                  ref={runQueryButtonRef}
                  icon="play"
                  intent="warning"
                  aria-label="Run query"
                  onClick={runQuery}
                  disabled={!query}
                />
                <Popover2 content={<CopyUrlPopover />} placement="bottom">
                  <Button
                    icon={
                      <Icon
                        icon="social-media"
                        color={bpTheme ? "white" : "#383e47"}
                      />
                    }
                    className={"dark:bg-[#383e47] dark:hover:bg-[#2f343c]"}
                  />
                </Popover2>
                <LoadFileDialog />
              </div>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <div className="flex flex-row justify-start items-center gap-1">
                <Button
                  className={"dark:bg-[#383e47] dark:hover:bg-[#2f343c]"}
                  icon={
                    <Icon
                      icon={bpTheme ? "flash" : "moon"}
                      color={bpTheme ? "white" : "#383e47"}
                    />
                  }
                  onClick={toggleTheme}
                ></Button>
                <Button
                  className={"dark:bg-[#383e47] dark:hover:bg-[#2f343c]"}
                  icon={
                    <Icon icon="help" color={bpTheme ? "white" : "#383e47"} />
                  }
                  onClick={openHelpDialog}
                />
              </div>
            </Navbar.Group>
          </Navbar>
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment>
            <Allotment.Pane>
              <div className="dark:bg-neutral-800 dark:text-neutral-400 h-full">
                <div className="py-1 px-3 text-xs">
                  <ContentEditable
                    className="hover:cursor-pointer focus:cursor-text hover:focus:cursor-text"
                    html={name}
                    onChange={handleOnChangeName}
                  />
                </div>
                <Editor
                  language="sql"
                  value={query}
                  onChange={(query) => setUrlState({ query })}
                  onCmdEnter={clickOnRunQueryButton}
                  onOptionH={openHelpDialog}
                />
              </div>
            </Allotment.Pane>
            <Allotment.Pane>
              <div className="dark:bg-neutral-800 dark:text-neutral-400 h-full">
                <div className="py-1 px-3 text-xs cursor-default ">
                  Parameters
                </div>
                <Editor
                  ref={paramsEditorRef}
                  language="json"
                  value={jsonParams}
                  onChange={(jsonParams) => setUrlState({ jsonParams })}
                  onCmdEnter={clickOnRunQueryButton}
                  onOptionH={openHelpDialog}
                />
              </div>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
      {HotKeysHelpDialog}
    </>
  );
}

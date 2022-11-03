import { Alignment, Button, InputGroup, Navbar } from "@blueprintjs/core";
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

export type QueryFormProps = {
  onPerformQuery: () => void;
  onSuccess: (result?: QueryResult) => void;
  onError: (error?: string) => void;
  paramsEditorRef: React.RefObject<EditorRef>;
};

export default function QueryForm(props: QueryFormProps) {
  const { paramsEditorRef } = props;
  const runQueryButtonRef = useRef<Button>(null);

  const {
    urlState: { query, serverAddress, username, jsonParams, name },
    setUrlState,
    password,
    setPassword,
    runQuery,
    openHelpDialog,
    HotKeysHelpDialog,
  } = useQueryForm(props);

  const [title, setTitle] = useSetTitle(name);

  const handleOnChangeName = (e: ContentEditableEvent) => {
    setUrlState({ name: e.target.value });
    setTitle(e.target.value);
  };

  const clickOnRunQueryButton = () => {
    runQueryButtonRef.current?.buttonRef?.click();
  };

  return (
    <>
      <Allotment vertical>
        <Allotment.Pane maxSize={48} minSize={48}>
          <Navbar className="mb-2 bg-slate-50">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>
                <Brand />
              </Navbar.Heading>
              <InputGroup
                leftIcon="globe-network"
                value={serverAddress}
                placeholder="Server address"
                onChange={(e) => setUrlState({ serverAddress: e.target.value })}
                className="flex-grow"
                size={40}
              />
              <InputGroup
                leftIcon="user"
                placeholder="Username"
                value={username}
                onChange={(e) => setUrlState({ username: e.target.value })}
              />
              <InputGroup
                leftIcon="lock"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-row justify-start items-center ml-1 gap-1">
                <Button
                  ref={runQueryButtonRef}
                  icon="play"
                  intent="warning"
                  aria-label="Run query"
                  onClick={runQuery}
                  disabled={!query}
                />
                <Button icon="help" onClick={openHelpDialog} />
                <Popover2 content={<CopyUrlPopover />} placement="bottom">
                  <Button icon="social-media" />
                </Popover2>
              </div>
            </Navbar.Group>
          </Navbar>
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment>
            <Allotment.Pane>
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
            </Allotment.Pane>
            <Allotment.Pane>
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
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
      {HotKeysHelpDialog}
    </>
  );
}

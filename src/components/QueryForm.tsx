import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { Allotment } from "allotment";
import { useMemo, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { useConnectionContext } from "../contexts/useConnectionContext";
import { useThemeContext } from "../contexts/useThemeContext";
import { useConnectionDrawer } from "../hooks/useConnectionDrawer";
import { useQueryForm } from "../hooks/useQueryForm";
import { useSetTitle } from "../hooks/useSetTitle";
import { QueryResult } from "../lib/clickhouse-clients";
import Brand from "./Brand";
import ConnectionCaption from "./ConnectionCaption";
import CopyUrlPopover from "./CopyUrlPopover";
import Editor, { EditorRef } from "./Editor";
import SelectThemeButton from "./SelectThemeButton";
import ThemedButton from "./ThemedButton";

export type QueryFormProps = {
  onPerformQuery: () => void;
  onSuccess: (result?: QueryResult) => void;
  onError: (error?: string) => void;
  paramsEditorRef: React.RefObject<EditorRef>;
};

export default function QueryForm(props: QueryFormProps) {
  const { bpTheme } = useThemeContext();
  const { paramsEditorRef } = props;
  const runQueryButtonRef = useRef<Button>(null);
  const {
    urlState: { query, jsonParams, name },
    setUrlState,
    runQuery,
    openHelpDialog,
    HotKeysHelpDialog,
  } = useQueryForm(props);

  const [ConnectionsDrawer, openConnectionDrawer] = useConnectionDrawer();

  const [, setTitle] = useSetTitle(name);

  const handleOnChangeName = (e: ContentEditableEvent) => {
    const name = e.target.value.split("<div><br></div>").join("");
    setUrlState({ name });
    setTitle(name);
  };

  const { activeConnectionId } = useConnectionContext();

  const disableRunQueryButton = useMemo(
    () => !query || !activeConnectionId,
    [query, activeConnectionId]
  );

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
              <div className="flex flex-row justify-start items-center mr-1 gap-1">
                <Button
                  ref={runQueryButtonRef}
                  icon="play"
                  intent="warning"
                  aria-label="Run query"
                  onClick={runQuery}
                  disabled={disableRunQueryButton}
                />
                <Popover2
                  className={bpTheme}
                  content={<CopyUrlPopover />}
                  placement="bottom"
                >
                  <ThemedButton icon="social-media" />
                </Popover2>
                <ThemedButton
                  icon="data-connection"
                  action={openConnectionDrawer}
                />
                <ConnectionCaption />
              </div>
            </Navbar.Group>
            <Navbar.Group
              align={Alignment.RIGHT}
              className="flex flex-row justify-start items-center gap-1"
            >
              <SelectThemeButton />
              <ThemedButton icon="help" action={openHelpDialog} />
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
      {ConnectionsDrawer}
    </>
  );
}

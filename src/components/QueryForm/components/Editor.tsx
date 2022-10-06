import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef } from "react";
import { addAction } from "../../../lib/editor-helpers/add-action.editor.helper";

type EditorProps = {
  value?: string;
  onChange?: (value?: string) => void;
  onCmdEnter?: () => void;
  onOptionH?: () => void;
  onOptionP?: () => void;
};

export default function Editor({
  value,
  onChange,
  onCmdEnter,
  onOptionH,
  onOptionP,
}: EditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleOnMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  useEffect(() => {
    if (editorRef.current) {
      addAction(editorRef.current, {
        id: "run-query",
        label: "Run query",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: () => {
          onCmdEnter?.();
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
      addAction(editorRef.current, {
        id: "show-help",
        label: "Show help",
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyH],
        run: () => {
          onOptionH?.();
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
      addAction(editorRef.current, {
        id: "add-parameter",
        label: "Add parameter",
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyP],
        run: () => {
          onOptionP?.();
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
    }
  }, [value, onCmdEnter, onOptionH, onOptionP]);

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      defaultValue={value ?? "-- TYPE YOUR SQL HERE"}
      language="sql"
      onChange={onChange}
      onMount={handleOnMount}
      options={{
        minimap: { enabled: false },
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

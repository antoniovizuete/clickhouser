import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef } from "react";

type EditorProps = {
  value?: string;
  onChange?: (value?: string) => void;
  onCmdEnter?: () => void;
};

export default function Editor({ value, onChange, onCmdEnter }: EditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleOnMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addAction({
        id: "run-query",
        label: "Run query",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: () => {
          onCmdEnter?.();
        },
      });
    }
  }, [value]);

  return (
    <MonacoEditor
      height="40vh"
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

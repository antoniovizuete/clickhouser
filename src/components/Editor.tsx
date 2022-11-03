import MonacoEditor from "@monaco-editor/react";
import {
  editor,
  KeyCode,
  KeyMod,
} from "monaco-editor/esm/vs/editor/editor.api";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useTheme } from "../contexts/useTheme";
import { addAction } from "../lib/editor-helpers/add-action.editor.helper";

type EditorProps = {
  defaultValue?: string;
  language: "sql" | "json";
  value?: string;
  onChange?: (value?: string) => void;
  onCmdEnter?: (editor: editor.IStandaloneCodeEditor) => void;
  onOptionH?: () => void;
};

export type EditorRef = {
  getValue: () => string | undefined;
};

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { defaultValue, language, value, onChange, onCmdEnter, onOptionH } =
    props;

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue(),
  }));

  useEffect(() => {
    if (editorRef.current) {
      addAction(editorRef.current, {
        id: "run-query",
        label: "Run query",
        keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
        run: () => {
          onCmdEnter?.(editorRef.current!);
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
      addAction(editorRef.current, {
        id: "show-help",
        label: "Show help",
        keybindings: [KeyMod.Alt | KeyCode.KeyH],
        run: () => {
          onOptionH?.();
        },
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
      });
    }
  }, [onCmdEnter, onOptionH]);

  const handleOnChange = (value?: string) => {
    onChange?.(value);
  };

  const { theme } = useTheme();

  return (
    <MonacoEditor
      theme={theme === "dark" ? "vs-dark" : "light"}
      className="mb-6"
      height="100%"
      width="100%"
      defaultValue={value ?? defaultValue}
      language={language}
      onChange={handleOnChange}
      onMount={handleOnMount}
      options={{
        minimap: { enabled: false },
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
});
export default Editor;

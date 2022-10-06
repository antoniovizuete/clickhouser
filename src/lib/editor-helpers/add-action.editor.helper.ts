import { editor } from "monaco-editor/esm/vs/editor/editor.api";

export function addAction(
  editor: editor.IStandaloneCodeEditor,
  action: editor.IActionDescriptor
) {
  if (editor.getAction(action.id)) {
    editor.getAction(action.id).run = action.run as editor.IEditorAction["run"];
    return;
  }
  editor.addAction(action);
}

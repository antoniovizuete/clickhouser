import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { SuggestionProvider } from "./types";

export const getParemeterNameSuggetionProvider = (
  paramKeys: string[] = []
): SuggestionProvider => {
  return {
    language: "sql",
    provider: {
      triggerCharacters: ["{"],
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const lastWord = textUntilPosition.split(" ").pop();

        const match = lastWord?.match(/\{/g);
        if (!match) {
          return {
            suggestions: [],
          };
        }
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        return {
          suggestions: paramKeys.map((key) => ({
            label: key,
            kind: languages.CompletionItemKind.Keyword,
            insertText: key,
            range,
          })),
        };
      },
    },
  };
};

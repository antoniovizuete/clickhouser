import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { SuggestionProvider } from "./types";

export const paremeterSnippetSuggetionProvider: SuggestionProvider = {
  language: "sql",
  provider: {
    provideCompletionItems(model, position, context, token) {
      const word = model.getWordUntilPosition(position);

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: [
          {
            label: "parameter",
            kind: languages.CompletionItemKind.Snippet,
            insertText: "{${1:parameterName}:${2:parameterType}}",
            insertTextRules:
              languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
        ],
      };
    },
  },
};

import { languages } from "monaco-editor/esm/vs/editor/editor.api";

export type SuggestionProvider = {
  language: languages.LanguageSelector;
  provider: languages.CompletionItemProvider;
};

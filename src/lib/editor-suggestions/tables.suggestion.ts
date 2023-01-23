import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { UrlState } from "../../hooks/useUrlState";
import { isJsonResult, performQuery } from "../peform-query";
import { SuggestionProvider } from "./types";

type Params = Pick<UrlState, "serverAddress" | "username"> & {
  password: string | undefined;
};
const getTables = async (params: Params) => {
  const { result } = await performQuery({
    ...params,
    query: "show tables",
  });

  if (result && isJsonResult(result)) {
    return result.data.map(([table]) => table as string);
  }
  return [];
};

const language = "sql";

export const getTablesSuggetionProvider = async (
  params: Params
): Promise<SuggestionProvider> => {
  const tables = await getTables(params);

  if (tables.length === 0) {
    return {
      language,
      provider: {
        provideCompletionItems() {
          return {
            suggestions: [],
          };
        },
      },
    };
  }

  return {
    language,
    provider: {
      //triggerCharacters: ["{"],
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const lastWord = textUntilPosition.split(" ").pop();
        //const anteLastWord = textUntilPosition.split(" ").slice(-2)[0];

        const match = lastWord?.match(/FROM/gi);
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

        const suggestions = tables.map((table) => ({
          label: table,
          kind: languages.CompletionItemKind.Keyword,
          insertText: table,
          range,
        }));

        console.log(suggestions);
        return {
          suggestions,
        };
      },
    },
  };
};

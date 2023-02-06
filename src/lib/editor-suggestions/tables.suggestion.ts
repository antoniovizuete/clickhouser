import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { UrlState } from "../../hooks/useUrlState";
import {
  ClickhouseConnectionParams,
  isJsonResult,
  performQuery,
} from "../clickhouse-clients";

import { SuggestionProvider } from "./types";
import { noopProvider } from "./utils";

const getTables = async (params: ClickhouseConnectionParams) => {
  const { result } = await performQuery({
    ...params,
    query: "SELECT database, name FROM system.tables",
  });

  if (result && isJsonResult(result)) {
    return result.data.map(([database, table]) => ({
      label: `${database}.${table}`,
      database: database as string,
      table: table as string,
    }));
  }
  return [];
};

const language = "sql";

export const getTablesSuggestionProvider = async (
  params: ClickhouseConnectionParams
): Promise<SuggestionProvider> => {
  const tables = await getTables(params);

  if (tables.length === 0) {
    return {
      language,
      provider: noopProvider,
    };
  }

  return {
    language,
    provider: {
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const lastWord = textUntilPosition.trim().split(" ").pop();
        const anteLastWord = textUntilPosition.split(" ").slice(-2)[0];

        const fromMatch = lastWord?.match(/FROM/gi);
        const databaseFromMatch =
          anteLastWord?.match(/FROM/gi) && lastWord?.endsWith(".");

        if (!fromMatch && !databaseFromMatch) {
          return {
            suggestions: [],
          };
        }

        return {
          suggestions: tables.map((table) => ({
            label: table.label,
            kind: languages.CompletionItemKind.Reference,
            insertText: table.label,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
          })),
        };
      },
    },
  };
};

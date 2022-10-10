import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { SuggestionProvider } from "./types";

export const paremeterTypeSuggetionProvider: SuggestionProvider = {
  language: "sql",
  provider: {
    triggerCharacters: [":"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const lastWord = textUntilPosition.split(" ").pop();

      const match = lastWord?.match(/\{[a-zA-Z0-9]+:/g);
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
        suggestions: types.map((type) => ({
          label: type,
          kind: languages.CompletionItemKind.Keyword,
          insertText: type,
          range,
        })),
      };
    },
  },
};

const types = [
  "AggregateFunction",
  "Array",
  "Bool",
  "Date",
  "Date32",
  "DateTime",
  "DateTime32",
  "DateTime64",
  "Decimal",
  "Decimal128",
  "Decimal256",
  "Decimal32",
  "Decimal64",
  "Enum",
  "Enum16",
  "Enum8",
  "FixedString",
  "Float32",
  "Float64",
  "IPv4",
  "IPv6",
  "Int128",
  "Int16",
  "Int256",
  "Int32",
  "Int64",
  "Int8",
  "IntervalDay",
  "IntervalHour",
  "IntervalMicrosecond",
  "IntervalMillisecond",
  "IntervalMinute",
  "IntervalMonth",
  "IntervalNanosecond",
  "IntervalQuarter",
  "IntervalSecond",
  "IntervalWeek",
  "IntervalYear",
  "LowCardinality",
  "Map",
  "MultiPolygon",
  "Nested",
  "Nothing",
  "Nullable",
  "Object",
  "Point",
  "Polygon",
  "Ring",
  "SimpleAggregateFunction",
  "String",
  "Tuple",
  "UInt128",
  "UInt16",
  "UInt256",
  "UInt32",
  "UInt64",
  "UInt8",
];

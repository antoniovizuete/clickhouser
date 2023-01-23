import { useMonaco } from "@monaco-editor/react";
import { IDisposable } from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useState } from "react";
import { getParemeterNameSuggetionProvider } from "../lib/editor-suggestions/parameter-name.suggestion";
import { paremeterSnippetSuggetionProvider } from "../lib/editor-suggestions/parameter-snippet.suggestion";
import { paremeterTypeSuggetionProvider } from "../lib/editor-suggestions/parameter-type.suggestion";
import { useUrlState } from "./useUrlState";
import { initialState } from "../hooks/useQueryForm";
import { usePasswordContext } from "../contexts/usePassword";
import { getTablesSuggestionProvider } from "../lib/editor-suggestions/tables.suggestion";

type Params = {
  jsonParams: string;
};

export const useMonacoConfigSupplier = ({ jsonParams }: Params) => {
  const monaco = useMonaco();
  const [urlState] = useUrlState({ initialState });
  const { password } = usePasswordContext();
  const [paramKeys, setParamKeys] = useState<string[]>([]);
  const [areSameParamKeys, setAreSameParamKeys] = useState(false);

  useEffect(() => {
    let subs: IDisposable[] = [];
    if (monaco) {
      subs.push(
        monaco.languages.registerCompletionItemProvider(
          paremeterSnippetSuggetionProvider.language,
          paremeterSnippetSuggetionProvider.provider
        )
      );
      subs.push(
        monaco.languages.registerCompletionItemProvider(
          paremeterTypeSuggetionProvider.language,
          paremeterTypeSuggetionProvider.provider
        )
      );
    }
    return () => {
      subs.forEach((sub) => sub.dispose());
    };
  }, [monaco]);

  useEffect(() => {
    try {
      const parsedParams = Object.keys(JSON.parse(jsonParams));
      setParamKeys((prev) => {
        if (arraysAreEqual(prev, parsedParams)) {
          setAreSameParamKeys(true);
          return prev;
        }
        setAreSameParamKeys(false);
        return parsedParams;
      });
    } catch (e) {}
  }, [jsonParams]);

  useEffect(() => {
    let subs: IDisposable[] = [];
    if (monaco) {
      {
        const { provider, language } =
          getParemeterNameSuggetionProvider(paramKeys);
        subs.push(
          monaco.languages.registerCompletionItemProvider(
            language,
            areSameParamKeys
              ? {
                  triggerCharacters: provider.triggerCharacters,
                  provideCompletionItems: function () {
                    return { suggestions: [] };
                  },
                }
              : provider
          )
        );
      }
    }
    return () => {
      setAreSameParamKeys(false);
      subs.forEach((sub) => sub.dispose());
    };
  }, [monaco, paramKeys, areSameParamKeys]);

  useEffect(() => {
    let subs: IDisposable[] = [];

    if (monaco && password) {
      getTablesSuggestionProvider({
        password,
        ...urlState,
      }).then(({ provider, language }) =>
        subs.push(
          monaco.languages.registerCompletionItemProvider(language, provider)
        )
      );
    }
    return () => {
      subs.forEach((sub) => sub.dispose());
    };
  }, [monaco, password]);
};

const arraysAreEqual = (array1: string[], array2: string[]): boolean =>
  array1.length === array2.length &&
  array1.every((element, index) => element === array2[index]);

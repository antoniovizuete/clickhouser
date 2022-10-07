import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { Action, initialState, reducer, State } from "./QueryForm.reducer";

export type QueryFormContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

type QueryFormProviderProps = PropsWithChildren<{
  initialState: State;
}>;

const QueryFormContext = createContext<QueryFormContextType>({
  state: initialState,
} as QueryFormContextType);

export const QueryFormProvider = ({
  initialState,
  children,
}: QueryFormProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QueryFormContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryFormContext.Provider>
  );
};

export const useQueryFormContext = () => useContext(QueryFormContext);

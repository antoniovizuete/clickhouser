export enum Actions {
  SetQuery = "SetQuery",
  SetServerAddress = "SetServerAddress",
  SetUsername = "SetUsername",
  SetPassword = "SetPassword",
  SetJsonParams = "SetJsonParams",
}

export type State = {
  query?: string;
  serverAddress: string;
  username: string;
  password: string;
  jsonParams?: string;
};

export type Action =
  | { type: Actions.SetQuery; payload?: string }
  | { type: Actions.SetServerAddress; payload: string }
  | { type: Actions.SetUsername; payload: string }
  | { type: Actions.SetPassword; payload: string }
  | { type: Actions.SetJsonParams; payload?: string };

export const initialState: State = {
  query: "SELECT 1",
  serverAddress: "http://localhost:8123/",
  username: "default",
  password: "",
  jsonParams: '{\n  "param1": "value1",\n  "param2": "value2"\n}',
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SetQuery:
      return { ...state, query: action.payload };
    case Actions.SetServerAddress:
      return { ...state, serverAddress: action.payload };
    case Actions.SetUsername:
      return { ...state, username: action.payload };
    case Actions.SetPassword:
      return { ...state, password: action.payload };
    case Actions.SetJsonParams:
      return { ...state, jsonParams: action.payload };
    default:
      return state;
  }
};

import { XOR } from "../../types";

type HelpHotKey = {
  help: true;
};

type CallbackHotKey = {
  help?: false;
  callback: () => void;
  deps: any[];
};

export type HotKey = XOR<HelpHotKey, CallbackHotKey> & {
  combo: string;
  description: string;
};

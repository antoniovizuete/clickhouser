import React, { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import HotKeysHelpDialog, {
  HotKeysHelpDialogRef,
} from "./components/HotKeysHelpDialog";
import { HotKey } from "./types";

type ReturnType = [JSX.Element, () => void];

export const useHotKeys = (hotKeys: HotKey[]): ReturnType => {
  const helpDialogRef = useRef<HotKeysHelpDialogRef>(null);
  const openHelpDialog = () => {
    helpDialogRef.current?.open();
  };

  hotKeys.forEach(({ combo, callback, help, deps }) => {
    useHotkeys(
      combo,
      !help ? callback : openHelpDialog,
      { enableOnTags: ["INPUT", "SELECT", "TEXTAREA"] },
      deps
    );
  });

  return [
    <HotKeysHelpDialog ref={helpDialogRef} hotKeys={hotKeys} />,
    helpDialogRef.current?.open ?? (() => {}),
  ];
};

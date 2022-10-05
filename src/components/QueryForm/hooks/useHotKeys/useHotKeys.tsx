import React, { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import HotKeysHelpDialog, {
  HotKeysHelpDialogRef,
} from "./components/HotKeysHelpDialog";
import { HotKey } from "./types";

type Props = {
  hotKeys: HotKey[];
};

type ReturnType = [JSX.Element, () => void];

export const useHotKeys = ({ hotKeys }: Props): ReturnType => {
  const helpDialogRef = useRef<HotKeysHelpDialogRef>(null);

  hotKeys.forEach(({ combo, callback, help, deps }) => {
    if (!help) {
      useHotkeys(combo, callback, deps);
    } else {
      useHotkeys(
        combo,
        () => {
          helpDialogRef.current?.open();
        },
        deps
      );
    }
  });

  return [
    <HotKeysHelpDialog ref={helpDialogRef} hotKeys={hotKeys} />,
    helpDialogRef.current?.open ?? (() => {}),
  ];
};

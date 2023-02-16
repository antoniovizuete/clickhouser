import { Classes, Dialog, Tag } from "@blueprintjs/core";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useThemeContext } from "../contexts/useThemeContext";
import { HotKey } from "../hooks/useHotKeys/types";
import Brand from "./Brand";

type Props = {
  hotKeys: HotKey[];
};
export type HotKeysHelpDialogRef = {
  open: () => void;
};

const isMacOs = () => navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const isMacOsKeystroke = (keystroke: string) =>
  isMacOs() && (keystroke.includes("cmd") || keystroke.includes("option"));
const isNonMacOsKeystroke = (keystroke: string) =>
  !isMacOs() && (keystroke.includes("ctrl") || keystroke.includes("alt"));

const filterCombosByOS = (combo: string) =>
  isMacOsKeystroke(combo) || isNonMacOsKeystroke(combo);

const trasformToSymbol = (key: string) => {
  if (!isMacOs()) {
    return key;
  }
  switch (key) {
    case "CMD":
      return "⌘";
    case "OPTION":
      return "⌥";
    case "CTRL":
      return "⌃";
    case "SHIFT":
      return "⇧";
    default:
      return key;
  }
};

const HotKeysHelpDialog = forwardRef<HotKeysHelpDialogRef, Props>(
  ({ hotKeys }, ref) => {
    const { bpTheme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    useImperativeHandle(ref, () => ({ open }), []);

    const mapCombosToTags = (combos: string) =>
      [combos, ","]
        .join("")
        .split(",")
        .filter(Boolean)
        .filter(filterCombosByOS)
        .flatMap((combo, i) => (
          <div key={i} className="mx-2 my-1 gap-1 flex flex-row justify-end">
            {mapComboToTags(combo.trim())}
          </div>
        ));

    const mapComboToTags = (combo: string) =>
      combo.split("+").map((key) => (
        <Tag key={key} minimal>
          {trasformToSymbol(key.toUpperCase())}
        </Tag>
      ));

    return (
      <Dialog isOpen={isOpen} onClose={close} className={bpTheme}>
        <div
          className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-2`}
        >
          <div className="flex flex-col justify-center items-center text-xl">
            <Brand />
            <div className="mt-1 text-sm">v{APP_VERSION}</div>
          </div>
          {hotKeys.map(({ combo, description }) => (
            <div
              key={combo}
              className="flex flex-row w-full justify-between items-center"
            >
              <p>{description}</p>
              <div>{mapCombosToTags(combo)}</div>
            </div>
          ))}
        </div>
      </Dialog>
    );
  }
);

export default HotKeysHelpDialog;

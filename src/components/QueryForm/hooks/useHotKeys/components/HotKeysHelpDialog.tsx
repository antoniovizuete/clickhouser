import { Classes, Dialog, Tag } from "@blueprintjs/core";
import { forwardRef, useImperativeHandle, useState } from "react";
import { HotKey } from "../types";

type Props = {
  hotKeys: HotKey[];
};
export type HotKeysHelpDialogRef = {
  open: () => void;
};

const HotKeysHelpDialog = forwardRef<HotKeysHelpDialogRef, Props>(
  ({ hotKeys }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    useImperativeHandle(ref, () => ({ open }), []);

    const mapCombosToTags = (combos: string) =>
      [combos, ","]
        .join("")
        .split(",")
        .filter(Boolean)
        .flatMap((combo) => (
          <div className="mx-2 my-1 gap-1 flex flex-row justify-end">
            {mapComboToTags(combo)}
          </div>
        ));

    const mapComboToTags = (combo: string) =>
      combo.split("+").map((key) => <Tag minimal>{key.toUpperCase()}</Tag>);

    return (
      <Dialog isOpen={isOpen} onClose={close}>
        <div className={`${Classes.DIALOG_BODY} flex flex-col gap-2`}>
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

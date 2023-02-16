import { useRef } from "react";
import ConnectionDialog, {
  ConnectionDialogRef,
} from "../components/ConnectionDialog";

type ReturnType = [JSX.Element, ConnectionDialogRef["open"]];

export const useConnectionDialog = (): ReturnType => {
  const connectionsDialogRef = useRef<ConnectionDialogRef>(null);

  return [
    <ConnectionDialog ref={connectionsDialogRef} />,
    connectionsDialogRef.current?.open ?? (() => {}),
  ];
};

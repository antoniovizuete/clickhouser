import { useRef } from "react";
import ConnectionsDrawer, {
  ConnectionsDrawerRef,
} from "../components/ConnectionsDrawer";

type ReturnType = [JSX.Element, () => void];

export const useConnectionDrawer = (): ReturnType => {
  const connectionsDrawerRef = useRef<ConnectionsDrawerRef>(null);

  return [
    <ConnectionsDrawer ref={connectionsDrawerRef} />,
    connectionsDrawerRef.current?.open ??
      (() => {
        connectionsDrawerRef.current?.open();
      }),
  ];
};

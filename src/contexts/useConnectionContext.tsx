import { uniqueId } from "@blueprintjs/core/lib/esm/common/utils";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStorage } from "../hooks/useStorage";
import {
  Connection,
  ConnectionBody,
  ConnectionId,
} from "../lib/clickhouse-clients";
import { uuid } from "../lib/uuid";

type ConnectionsContextType = {
  connections: Connection[];
  activeConnectionId: ConnectionId | undefined;
  insert: (connectionBody: ConnectionBody) => void;
  remove: (connectionId: ConnectionId) => void;
  update: (connectionId: ConnectionId, connectionBody: ConnectionBody) => void;
  setActiveConnectionId: (connection: ConnectionId) => void;
  getActiveConnection: () => Connection | undefined;
};

const ConnectionsContext = createContext<ConnectionsContextType>({
  connections: [],
  activeConnectionId: undefined,
  insert: () => {},
  remove: () => {},
  update: () => {},
  setActiveConnectionId: () => {},
  getActiveConnection: () => undefined,
});

export function ConnectionsProvider({ children }: PropsWithChildren<{}>) {
  //const [connections, setConnections] = useState<Connection[]>([]);
  const [connections, setConnections] = useStorage<Connection[]>(
    "localStorage"
  )("connections", []);
  const [activeConnectionId, setActiveConnectionId] = useStorage<
    ConnectionId | undefined
  >("sessionStorage")("activeConnectionId", undefined);

  const insert = (connectionBody: ConnectionBody) => {
    setConnections((oldConnections) => [
      ...oldConnections,
      {
        id: uuid(),
        ...connectionBody,
      },
    ]);
  };

  const remove = ({ id }: ConnectionId) => {
    setConnections((oldConnections) => [
      ...oldConnections.filter((c) => c.id !== id),
    ]);
  };

  const update = ({ id }: ConnectionId, connectionBody: ConnectionBody) => {
    setConnections((oldConnections) => [
      ...oldConnections.map((c) =>
        c.id === id ? { id, ...connectionBody } : c
      ),
    ]);
  };

  useEffect(() => {
    const storedConnections = window.localStorage.getItem("connections");
    setConnections(JSON.parse(storedConnections ?? "[]") as Connection[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("connections", JSON.stringify(connections));
    if (connections.length === 0) {
      setActiveConnectionId(undefined);
    }
  }, [connections]);

  const contextValue = {
    connections,
    insert,
    remove,
    update,
    activeConnectionId,
    setActiveConnectionId,
    getActiveConnection: () =>
      connections.find((c) => c.id === activeConnectionId?.id),
  };

  return (
    <ConnectionsContext.Provider value={contextValue}>
      {children}
    </ConnectionsContext.Provider>
  );
}

export function useConnectionContext() {
  const context = useContext(ConnectionsContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

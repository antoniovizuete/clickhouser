import { Connection } from "../clickhouse-clients";

export const getConnectionDisplay = (connection?: Connection) => {
  if (!connection) {
    return "";
  }
  const { name, host, port, username } = connection;
  if (name) {
    return name;
  }
  return `${username}:*****@${
    host.length > 30 ? host.slice(0, 30) + "..." : host
  }:${port}`;
};

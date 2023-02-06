import { ClickhouseConnectionParams, ConnectionBody } from "./types";

export const transformConnectionToConnectionParams = (
  connection: ConnectionBody
): ClickhouseConnectionParams => {
  return {
    username: connection.username,
    password: connection.password,
    serverAddress: `http${connection.secure ? "s" : ""}://${connection.host}:${
      connection.port
    }`,
  };
};

export const checkUrl = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

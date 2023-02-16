import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  Icon,
  InputGroup,
  Switch,
  Tag,
} from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { useThemeContext } from "../contexts/useThemeContext";
import {
  performQuery,
  transformConnectionToConnectionParams,
} from "../lib/clickhouse-clients";
import { Connection } from "../lib/clickhouse-clients/types";
import { AppToaster } from "../lib/toaster/AppToaster";

type Props = {};

export type ConnectionDialogRef = {
  open: (connection?: Connection) => void;
};

const ConenctionsDialog = forwardRef<ConnectionDialogRef, Props>(({}, ref) => {
  const { bpTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const { insert, update } = useConnectionContext();

  const [connection, setConnection] = useState<Connection | undefined>(
    undefined
  );

  const [tested, setTested] = useState(false);

  const [name, setName] = useState(connection?.name || "");
  const [host, setHost] = useState(connection?.host || "localhost");
  const [port, setPort] = useState(connection?.port || 8123);
  const [username, setUsername] = useState(connection?.username || "default");
  const [password, setPassword] = useState(connection?.password || "");
  const [secure, setSecure] = useState(connection?.secure || false);

  useEffect(() => {
    setTested(false);
  }, [host, port, username, password, secure]);

  useEffect(() => {
    if (connection) {
      setName(connection.name);
      setHost(connection.host);
      setPort(connection.port);
      setUsername(connection.username);
      setPassword(connection.password);
      setSecure(connection.secure);
    } else {
      setName("");
      setHost("localhost");
      setPort(8123);
      setUsername("default");
      setPassword("");
      setSecure(false);
    }
  }, [connection]);

  const close = () => {
    setIsOpen(false);
    setConnection(undefined);
    setTested(false);
    setName("");
    setHost("localhost");
    setPort(8123);
    setUsername("default");
    setPassword("");
    setSecure(false);
  };
  const open = (connection?: Connection) => {
    setIsOpen(true);
    setConnection(connection);
  };

  const test = async () => {
    const { error } = await performQuery({
      query: "SELECT 1",
      name,
      host,
      port,
      username,
      password,
      secure,
    });
    if (error) {
      AppToaster.top.error(error);
    } else {
      AppToaster.top.success("The connection has been tested successfully");
    }

    setTested(!error);
  };

  useImperativeHandle(ref, () => ({ open }), []);

  const save = () => {
    const connectionToSave = {
      name,
      host,
      port,
      username,
      password,
      secure,
    };

    if (connection) {
      update({ id: connection.id }, connectionToSave);
    } else {
      insert(connectionToSave);
    }
    AppToaster.top.success("The connection has been saved successfully");
    close();
  };

  return (
    <Dialog
      icon="data-connection"
      isOpen={isOpen}
      onClose={close}
      className={bpTheme}
      title={`${connection ? "Edit" : "New"} Connection`}
    >
      <div className={`${Classes.DIALOG_BODY} ${bpTheme} flex flex-col gap-2`}>
        <FormGroup label="Name:">
          <InputGroup
            className={`flex-grow ${bpTheme}`}
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value || "")}
            size={40}
          />
        </FormGroup>
        <div className="flex flex-row justify-start items-start gap-1">
          <FormGroup label="Host:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={host}
              placeholder="Host"
              onChange={(e) => setHost(e.target.value || "")}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Port:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={port.toString()}
              placeholder="Port"
              onChange={(e) => setPort(parseInt(e.target.value))}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Secure:">
            <Switch
              className={`flex-grow ${bpTheme} mt-1`}
              checked={secure}
              innerLabel="http"
              innerLabelChecked="https"
              large
              onChange={(e) => setSecure(e.currentTarget.checked)}
            />
          </FormGroup>
        </div>
        <div className="flex flex-row justify-start items-start gap-2">
          <FormGroup label="Username:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value || "")}
              size={40}
            />
          </FormGroup>
          <FormGroup label="Password:">
            <InputGroup
              className={`flex-grow ${bpTheme}`}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value || "")}
              size={40}
              rightElement={
                <Tooltip2
                  content="The password is stored on local storage as plain text. Be careful!"
                  intent="warning"
                  placement="top"
                >
                  <Tag minimal intent="warning">
                    <Icon intent="warning" icon="warning-sign" />
                  </Tag>
                </Tooltip2>
              }
            />
          </FormGroup>
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={close}>Close</Button>
          <Button intent="success" onClick={test}>
            Test Connection
          </Button>
          <Button intent="primary" onClick={save} disabled={!tested}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
});

export default ConenctionsDialog;

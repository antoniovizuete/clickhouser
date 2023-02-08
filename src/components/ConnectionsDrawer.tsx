import {
  Alert,
  Button,
  Classes,
  Drawer,
  DrawerSize,
  H4,
  Icon,
  IconSize,
  Tag,
} from "@blueprintjs/core";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useConnectionContext } from "../contexts/useConnectionContext";
import { useThemeContext } from "../contexts/useThemeContext";
import { useConnectionDialog } from "../hooks/useConnectionDialog";
import { Connection } from "../lib/clickhouse-clients";
import { getConnectionDisplay } from "../lib/connections-helpers";

export type ConnectionsDrawerRef = {
  open: () => void;
};

const ConnectionsDrawer = forwardRef<ConnectionsDrawerRef, {}>((_, ref) => {
  const { bpTheme } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedConnetionToDelete, setSelectedConnetionToDelete] = useState<
    Connection | undefined
  >(undefined);

  useImperativeHandle(ref, () => ({ open }), []);

  const [ConnectionDialog, openConnetionDialog] = useConnectionDialog();
  const {
    connections,
    remove,
    setActiveConnectionId: setActiveConnection,
    activeConnectionId: activeConnection,
  } = useConnectionContext();

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const handleNewClick = () => {
    openConnetionDialog();
  };

  const handleEditClick = (connection: Connection) => {
    openConnetionDialog(connection);
  };

  const handleRemoveClick = (connection: Connection) => {
    setSelectedConnetionToDelete(connection);
    setIsAlertOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedConnetionToDelete) {
      remove(selectedConnetionToDelete);
      handleAlertClose();
    }
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setSelectedConnetionToDelete(undefined);
  };

  return (
    <>
      <Drawer
        className={bpTheme}
        isCloseButtonShown={false}
        icon="data-connection"
        isOpen={isOpen}
        onClose={close}
        position="left"
        size={DrawerSize.SMALL}
        title={
          <div className="flex flex-row justify-end items-center gap-1 mr-0.5">
            <H4>Connections</H4>
            <Button
              icon="plus"
              small
              intent="none"
              aria-label="New connection"
              onClick={handleNewClick}
            />
          </div>
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={`${Classes.DIALOG_BODY} flex flex-col gap-2`}>
            {(connections || []).map((connection) => {
              const active = connection.id === activeConnection?.id;
              return (
                <div
                  className="flex flex-row gap-1 justify-between items-center"
                  key={connection.id}
                >
                  <Tag
                    intent={active ? "success" : "none"}
                    interactive
                    large
                    minimal
                    fill
                    round
                    onClick={() => setActiveConnection(connection)}
                  >
                    <div
                      className={`flex-grow flex flex-row justify-between items-center ${
                        active ? "font-bold" : ""
                      }`}
                    >
                      <div className="flex-grow">
                        {getConnectionDisplay({ connection })}
                      </div>
                      {connection.id === activeConnection?.id && (
                        <Icon icon="link" className="ml-" />
                      )}
                    </div>
                  </Tag>
                  <div className="flex flex-row gap-1 justify-end">
                    <Icon
                      icon="edit"
                      intent="primary"
                      size={IconSize.STANDARD}
                      onClick={() => handleEditClick(connection)}
                      className="cursor-pointer"
                    ></Icon>

                    <Icon
                      intent="danger"
                      icon="cross"
                      size={IconSize.STANDARD}
                      className="cursor-pointer"
                      onClick={() => handleRemoveClick(connection)}
                    ></Icon>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
      {ConnectionDialog}
      <Alert
        className={bpTheme}
        cancelButtonText="Cancel"
        confirmButtonText="Remove"
        icon="trash"
        intent="danger"
        isOpen={isAlertOpen}
        onCancel={handleAlertClose}
        onConfirm={handleConfirmRemove}
      >
        <p>
          You are going to delete "
          {getConnectionDisplay({ connection: selectedConnetionToDelete })}"
          connection.
        </p>
        <p>Are you sure you want to remove this connection?</p>
      </Alert>
    </>
  );
});

export default ConnectionsDrawer;

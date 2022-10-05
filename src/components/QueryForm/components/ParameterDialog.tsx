import {
  Button,
  Classes,
  ControlGroup,
  Dialog,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { QueryParam } from "../../../lib/peform-query";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (key: string, value: string, type: "new" | "edit") => void;
  data?: QueryParam;
};

export default function ParameterDialog({
  isOpen,
  onClose,
  onConfirm,
  data,
}: Props) {
  const [key, setKey] = useState(data?.key);
  const [value, setValue] = useState(data?.value);

  useEffect(() => {
    setKey(data?.key);
    setValue(data?.value);
  }, [data]);

  const clearState = () => {
    setKey(undefined);
    setValue(undefined);
  };

  const handleOnClickClose = () => {
    onClose();
    clearState();
  };

  const handleOnClickSave = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (key && value) {
      onConfirm(key, value, data ? "edit" : "new");
      clearState();
    }
  };

  return (
    <Dialog
      title={`${data ? "Edit" : "New"} parameter`}
      isOpen={isOpen}
      onClose={handleOnClickClose}
    >
      <form onSubmit={handleOnClickSave}>
        <div className={Classes.DIALOG_BODY}>
          <ControlGroup vertical>
            <InputGroup
              placeholder="Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={data !== undefined}
            />
            <InputGroup
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </ControlGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={handleOnClickClose}
              intent={Intent.NONE}
              type="reset"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={!key || !value}
              //onClick={handleOnClickSave}
              intent={Intent.PRIMARY}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}

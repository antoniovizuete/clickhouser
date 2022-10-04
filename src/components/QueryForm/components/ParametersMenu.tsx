import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { QueryParam } from "../../../lib/peform-query";

type Props = {
  params: QueryParam[];
  onClickAdd: () => void;
  onClickRemove: (key: string) => void;
  onClickEdit: (key: string) => void;
};

export default function ParametersMenu({
  params,
  onClickAdd,
  onClickRemove,
  onClickEdit,
}: Props) {
  const handleRemove = (key: string) => () => {
    onClickRemove(key);
  };

  const handleEdit = (key: string) => () => {
    onClickEdit(key);
  };

  return (
    <>
      <Menu>
        <MenuItem icon="add" text="Add parameter" onClick={onClickAdd} />
        {params.length > 0 && <MenuDivider />}
        {params.map((param, i) => (
          <MenuItem key={i} text={`${param.key} (${param.value})`}>
            <MenuItem icon="edit" text="Edit" onClick={handleEdit(param.key)} />
            <MenuItem
              icon="trash"
              text="Remove"
              onClick={handleRemove(param.key)}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

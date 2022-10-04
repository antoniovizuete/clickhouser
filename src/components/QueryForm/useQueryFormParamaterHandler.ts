import { Dispatch, SetStateAction, useState } from "react";
import { QueryParam } from "../../lib/peform-query";

type Props = {
  params: QueryParam[];
  setParams: Dispatch<SetStateAction<QueryParam[]>>;
};

export const useQueryFormParamaterHandler = ({ params, setParams }: Props) => {
  const [isParameterDialogOpen, setIsParameterDialogOpen] = useState(false);
  const [parameterDialogData, setParameterDialogData] = useState<
    QueryParam | undefined
  >();

  const closeParameterDialog = () => setIsParameterDialogOpen(false);
  const openParameterDialog = () => setIsParameterDialogOpen(true);

  const handleOnConfirmParameterDialog = (
    key: string,
    value: string,
    type: "new" | "edit"
  ) => {
    if (type === "new") {
      setParams((prev) => [...prev, { key, value }]);
    } else {
      setParams((prev) => {
        console.log("handling edit", key, value);
        const newParams = [
          ...prev.map((param) => (param.key === key ? { key, value } : param)),
        ];
        console.log("newParams", newParams);
        return newParams;
      });
    }
    closeParameterDialog();
  };
  const handleOnRemoveParameter = (key: string) => {
    setParams((prev) => prev.filter((param) => param.key !== key));
  };
  const handleOnEditParameter = (key: string) => {
    const param = params.find((param) => param.key === key);
    console.log(key, param);
    if (param) {
      setParameterDialogData(param);
      openParameterDialog();
    }
  };

  const handleOnAddParameter = () => {
    setParameterDialogData(undefined);
    openParameterDialog();
  };

  return {
    isParameterDialogOpen,
    parameterDialogData,
    closeParameterDialog,
    openParameterDialog,
    handleOnConfirmParameterDialog,
    handleOnRemoveParameter,
    handleOnEditParameter,
    handleOnAddParameter,
  };
};

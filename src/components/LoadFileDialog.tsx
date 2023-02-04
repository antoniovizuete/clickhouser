import { Button, Classes, Dialog, FileInput, Icon } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "../contexts/useTheme";

const LoadFileDialog = () => {
  const [showLoadFileDialog, setShowLoadFileDialog] = useState(false);
  const { bpTheme } = useTheme();
  const [showDropZone, setShowDropZone] = useState(true);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setShowDropZone(false);
    },
    noClick: true,
  });
  return (
    <>
      <Tooltip2 content={"Load file"} placement="bottom">
        <Button
          className={"dark:bg-[#383e47] dark:hover:bg-[#2f343c]"}
          icon={
            <Icon icon="import" color={bpTheme ? "white" : "#383e47"}></Icon>
          }
          onClick={() => setShowLoadFileDialog(true)}
        />
      </Tooltip2>
      <Dialog
        title="Load file"
        className={"dark:bg-[#383e47]"}
        isOpen={showLoadFileDialog}
        onClose={() => {
          setShowLoadFileDialog(false);
          setShowDropZone(true);
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <main className="flex flex-col p-2">
            {showDropZone ? (
              <section
                {...getRootProps()}
                className="w-full h-full flex flex-col gap-2"
              >
                <input {...getInputProps()} />
                <div className="border-dashed border-2 border-indigo-600 flex flex-col gap-4 items-center p-4">
                  <Icon
                    className="opacity-40"
                    icon="import"
                    size={64}
                    color={bpTheme ? "white" : "#383e47"}
                  />
                  <h2 className="dark:text-[#e2e2e2]">
                    Drop a file with data to import it
                  </h2>
                </div>
                <FileInput
                  text="Choose a file to load"
                  inputProps={getInputProps()}
                />
              </section>
            ) : (
              <div>hola</div>
            )}
            <section className=""></section>
          </main>
        </div>
        <div className={Classes.DIALOG_FOOTER}></div>
      </Dialog>
    </>
  );
};

export default LoadFileDialog;

import { Button, InputGroup } from "@blueprintjs/core";
import { useState } from "react";

export default function CopyUrlPopover() {
  const [showCopied, setShowCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1500);
  };

  return (
    <div className="w-[30vw] p-5 flex flex-col justify-start items-end gap-2">
      <div className="w-full">
        <InputGroup
          style={{ cursor: "pointer" }}
          readOnly
          value={location.toString()}
          leftIcon="link"
          onClick={copyUrl}
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        {showCopied ? (
          <div className="text-green-500 ">Copied!</div>
        ) : (
          <div></div>
        )}
        <Button intent="warning" icon="duplicate" onClick={copyUrl}>
          Copy URL
        </Button>
      </div>
    </div>
  );
}

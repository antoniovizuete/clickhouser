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
    <div className="w-[30vw] p-5 flex flex-col gap-4">
      <h2 className="text-lg">Share your query</h2>
      <h6 className="text-xs text-gray-500">
        We don't store or serialize the password, so{" "}
        <span className="font-bold">never</span> will be shared or persisted.
      </h6>

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
          <div className="text-green-600 ">Copied!</div>
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

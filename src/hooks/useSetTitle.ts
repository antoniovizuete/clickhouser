import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useSetTitle = (
  title?: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [prevTitle, setPrevTitle] = useState(title ?? document.title);
  useEffect(() => {
    document.title = `${prevTitle} - [Clickhouser.app]`;
  }, [prevTitle]);

  return [prevTitle, setPrevTitle];
};

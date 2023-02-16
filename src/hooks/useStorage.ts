import { useState, useEffect } from "react";

export type StorageType = "localStorage" | "sessionStorage";

function selectStorage(type: StorageType): Storage {
  switch (type) {
    case "localStorage":
      return localStorage;
    case "sessionStorage":
      return sessionStorage;
    default:
      throw new Error(`Unknown storage type: ${type}`);
  }
}

export const useStorage =
  <T>(type: StorageType) =>
  (key: string, defaultValue: T) => {
    const storage = selectStorage(type);

    const [value, setValue] = useState<T>(() => {
      const saved = storage.getItem(key);
      const initial = saved != null ? JSON.parse(saved) : defaultValue;
      return initial;
    });

    useEffect(() => {
      storage.setItem(key, JSON.stringify(value ?? ""));
    }, [key, value]);

    return [value, setValue] as [T, typeof setValue];
  };

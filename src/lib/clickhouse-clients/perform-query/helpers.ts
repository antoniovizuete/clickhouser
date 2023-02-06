import { QueryResult } from "./types";

export const parseResponse = (response: string): QueryResult => {
  try {
    if (response === "") {
      return { message: "Ok" };
    }
    return JSON.parse(response);
  } catch (e) {
    return { value: response };
  }
};

const transformBool = (value: boolean): string => (value ? "true" : "false");

export const serializeParamValue = (value: unknown) => {
  if (value === null) {
    return "";
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const [first] = value;

    if (typeof first === "string") {
      return `['${value.join("','")}']`;
    }

    if (typeof first === "number") {
      return `[${value.join(",")}]`;
    }

    if (typeof first === "boolean") {
      return `[${value.map(transformBool).join(",")}]`;
    }

    throw new Error(`Unsupported array type: ${typeof first}`);
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (typeof value === "boolean") {
    return transformBool(value);
  }

  throw new Error(`Unsupported type: ${typeof value}`);
};

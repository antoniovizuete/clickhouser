import { JsonResult } from "./peform-query";

export enum KindEnum {
  RAW = "RAW",
  JSON = "JSON",
  JSON_EACH_ROW = "JSON_EACH_ROW",
  CSV = "CSV",
  TSV = "TSV",
}

type KindExporters = {
  [key in KindEnum]: {
    exporter: (result: JsonResult) => string;
    extension: string;
    mimeType: string;
  };
};

export const kindExportersMimeType: { [key in KindEnum]: string } = {
  [KindEnum.RAW]: "application/json",
  [KindEnum.JSON]: "application/json",
  [KindEnum.JSON_EACH_ROW]: "application/json",
  [KindEnum.CSV]: "text/csv",
  [KindEnum.TSV]: "text/tab-separated-values",
};

export const kindExportersExtension: { [key in KindEnum]: string } = {
  [KindEnum.RAW]: "json",
  [KindEnum.JSON]: "json",
  [KindEnum.JSON_EACH_ROW]: "json",
  [KindEnum.CSV]: "csv",
  [KindEnum.TSV]: "tsv",
};

const exportSeparatedValues = (separator: string) => (result: JsonResult) => {
  const { data, meta } = result;
  const header = meta.map((m) => m.name).join(separator);
  const rows = data.map((row) => row.join(separator)).join("\n");
  return `${header}\n${rows}`;
};

const kindExporters: KindExporters = {
  [KindEnum.RAW]: {
    exporter: (result: JsonResult) => JSON.stringify(result),
    extension: "json",
    mimeType: "application/json",
  },
  [KindEnum.JSON]: {
    exporter: (result: JsonResult) => JSON.stringify(toJson(result)),
    extension: "json",
    mimeType: "application/json",
  },
  [KindEnum.JSON_EACH_ROW]: {
    exporter: (result: JsonResult) =>
      toJson(result)
        .map((row) => JSON.stringify(row))
        .join("\n"),
    extension: "json",
    mimeType: "application/json",
  },
  [KindEnum.CSV]: {
    exporter: exportSeparatedValues(","),
    extension: "csv",
    mimeType: "text/csv",
  },
  [KindEnum.TSV]: {
    exporter: exportSeparatedValues("\t"),
    extension: "tsv",
    mimeType: "text/tab-separated-values",
  },
};

const toJson = (result: JsonResult): any[] => {
  return result.data.map((row) => {
    const obj = {} as Record<string, string | number | boolean>;
    result.meta.forEach((meta, index) => {
      obj[meta.name] = row[index];
    });
    return obj;
  });
};

export function download(data: JsonResult, kind: KindEnum) {
  const { exporter, extension, mimeType } = kindExporters[kind];
  const blob = new Blob([exporter(data)], {
    type: mimeType,
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `data.${extension}`;
  link.click();
  link.parentNode?.removeChild(link);
}

import { Tooltip2 } from "@blueprintjs/popover2";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { useThemeContext } from "../contexts/useThemeContext";
import { JsonResult } from "../lib/clickhouse-clients";

type Params = {
  result: JsonResult;
};

export default function TableResult({ result }: Params) {
  const { bpTheme } = useThemeContext();

  const widths = Array.from(
    { length: Math.min(50, result.data.length) },
    (_: undefined, i: number) => i
  )
    .map((i) =>
      result.data[i].map((cell, colIndex) =>
        Math.min(
          400,
          Math.max(
            Math.max(
              Math.floor(
                [...(String(cell) || "")]
                  .map<number>((l) => (l.match(/[a-zA-Z0-9]/) ? 1.5 : 1))
                  .reduce((a, c) => a + c, 0)
              ),
              10
            ) * 8,
            result.meta[colIndex].name.length * 10
          )
        )
      )
    )
    .reduce((acc, curr) => acc.map((accCell, i) => Math.max(accCell, curr[i])));
  console.log(result);
  const tableDatasetComponents = result.meta.map((meta, columnNumber) => (
    <Column
      key={meta.name}
      name={meta.name}
      cellRenderer={(rowNumber) => {
        const rawValue = result.data[rowNumber][columnNumber];

        if (rawValue == null) {
          return (
            <Cell>
              <div className="text-gray-400 font-mono">(null)</div>
            </Cell>
          );
        }
        if (meta.type.includes("Map(") || meta.type.includes("Array(")) {
          return (
            <Cell>
              <div className="text-gray-400 font-mono">
                {JSON.stringify(rawValue)}
              </div>
            </Cell>
          );
        }
        const value = String(rawValue);
        return (
          <Cell className="text-ellipsis">
            <Tooltip2 content={value} disabled={value.length < 50}>
              <div className="font-mono text-ellipsis whitespace-pre">
                {value}
              </div>
            </Tooltip2>
          </Cell>
        );
      }}
    />
  ));

  return (
    <div className="overflow-auto h-full">
      <Table2
        columnWidths={widths}
        numRows={result.rows}
        className={`h-full ${bpTheme}`}
        enableColumnResizing
        enableColumnReordering={false}
        enableRowResizing={false}
        enableRowReordering={false}
      >
        {tableDatasetComponents}
      </Table2>
    </div>
  );
}

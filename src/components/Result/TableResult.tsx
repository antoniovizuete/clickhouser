import { JsonResult } from "../../lib/peform-query";
import { Table2, Column, Cell, SelectionModes } from "@blueprintjs/table";

type Params = {
  result: JsonResult;
};

export default function TableResult({ result }: Params) {
  const tableDatasetComponents = result.meta.map((meta, columnNumber) => (
    <Column
      key={meta.name}
      name={meta.name}
      cellRenderer={(rowNumber) => (
        <Cell>
          <pre>{String(result.data[rowNumber][columnNumber])}</pre>
        </Cell>
      )}
    />
  ));

  return (
    <div className="border border-gray-300 overflow-auto h-full">
      <Table2
        numRows={result.rows}
        selectionModes={SelectionModes.NONE}
        className="h-full"
      >
        {tableDatasetComponents}
      </Table2>
    </div>
  );
}

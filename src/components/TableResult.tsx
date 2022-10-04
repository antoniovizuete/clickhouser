import { JsonResult } from "../lib/peform-query";

type Params = {
  result: JsonResult;
};

export default function TableResult({ result }: Params) {
  const head = result.meta.map((meta) => <th key={meta.name}>{meta.name}</th>);
  const body = result.data.map((row, i) => (
    <tr key={i}>
      {row.map((cell, j) => (
        <td key={`${i}${j}`}>{String(cell)}</td>
      ))}
    </tr>
  ));
  return (
    <div className="p-2 overflow-auto">
      <table className="w-full bp4-html-table bp4-html-table-condensed bp4-html-table-striped bp4-interactive">
        <thead>
          <tr>{head}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}

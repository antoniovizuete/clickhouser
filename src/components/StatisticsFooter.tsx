import { Statistics } from "../lib/peform-query";
import {
  formatReadableBytes,
  formatReadableRows,
} from "../lib/stats-helpers/format-readable";

type Props = {
  statistics: Statistics & {
    rows: number;
  };
};

export default function StatisticsFooter({ statistics }: Props) {
  return (
    <div className="flex flex-row justify-start items-center gap-2 divide-x divide-gray-300 border-r border-gray-300">
      <div className="stat">Elapsed: {statistics.elapsed.toFixed(2)} s.</div>
      <div className="stat">{formatReadableRows(statistics.rows)} rows</div>
      <div className="stat">
        {formatReadableRows(statistics.rows_read)} read rows
      </div>
      <div className="stat">{formatReadableBytes(statistics.bytes_read)}</div>
    </div>
  );
}

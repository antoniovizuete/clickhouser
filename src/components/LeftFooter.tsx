import { Icon, Menu } from "@blueprintjs/core";
import { MenuItem2, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { download, KindEnum } from "../lib/file-downloader";
import { JsonResult } from "../lib/peform-query";
import {
  formatReadableBytes,
  formatReadableRows,
} from "../lib/stats-helpers/format-readable";

type Props = {
  result: JsonResult;
};

export default function LeftFooter({ result }: Props) {
  const { statistics, data } = result;
  const handleDownload = (kind: KindEnum) => () => {
    download(result, kind);
  };
  return (
    <div className="flex flex-row justify-start items-center gap-2 divide-x divide-gray-300 border-r border-gray-300">
      <div className="stat">Elapsed: {statistics.elapsed.toFixed(2)} s.</div>
      <div className="stat">{formatReadableRows(data.length)} rows</div>
      <div className="stat">
        {formatReadableRows(statistics.rows_read)} read rows
      </div>
      <div className="stat">{formatReadableBytes(statistics.bytes_read)}</div>
      <div className="stat bg-[#fbb360]">
        <Popover2
          position="top"
          minimal
          content={
            <Menu>
              <MenuItem2
                text="As raw JSON"
                onClick={handleDownload(KindEnum.RAW)}
              />
              <MenuItem2
                text="As JSON"
                onClick={handleDownload(KindEnum.JSON)}
              />
              <MenuItem2
                text="As JSONEachRow"
                onClick={handleDownload(KindEnum.JSON_EACH_ROW)}
              />
              <MenuItem2 text="As CSV" onClick={handleDownload(KindEnum.CSV)} />
              <MenuItem2 text="As TSV" onClick={handleDownload(KindEnum.TSV)} />
            </Menu>
          }
        >
          <Tooltip2 content="Download data">
            <Icon icon="bring-data" className="cursor-pointer" />
          </Tooltip2>
        </Popover2>
      </div>
    </div>
  );
}
import { Icon, Menu } from "@blueprintjs/core";
import { MenuItem2, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { useTheme } from "../contexts/useTheme";
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
  const { bpTheme } = useTheme();
  const { statistics, data } = result;
  const handleDownload = (kind: KindEnum) => () => {
    download(result, kind);
  };
  return (
    <div className="flex flex-row justify-start items-center gap-2 divide-x divide-neutral-300 dark:divide-neutral-500 border-l border-l-neutral-300 dark:border-l-neutral-500">
      <div className="stat">Elapsed: {statistics.elapsed.toFixed(2)} s.</div>
      <div className="stat">{formatReadableRows(data.length)} rows</div>
      <div className="stat">
        {formatReadableRows(statistics.rows_read)} read rows
      </div>
      <div className="stat">{formatReadableBytes(statistics.bytes_read)}</div>
      {data.length > 0 && (
        <div className="stat bg-[#fbb360]">
          <Popover2
            popoverClassName={bpTheme}
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
                <MenuItem2
                  text="As CSV"
                  onClick={handleDownload(KindEnum.CSV)}
                />
                <MenuItem2
                  text="As TSV"
                  onClick={handleDownload(KindEnum.TSV)}
                />
              </Menu>
            }
          >
            <Tooltip2 content="Download data">
              <Icon
                icon="bring-data"
                className="cursor-pointer"
                color="rgb(28 33 39)"
              />
            </Tooltip2>
          </Popover2>
        </div>
      )}
    </div>
  );
}

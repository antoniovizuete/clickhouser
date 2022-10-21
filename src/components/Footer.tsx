import { isJsonResult, QueryResult } from "../lib/peform-query";
import StatisticsFooter from "./StatisticsFooter";

type Props = {
  result?: QueryResult;
};

export default function Footer({ result }: Props) {
  return (
    <div className="flex flex-row justify-between items-center pl-1 pr-5 py-0.5 bg-slate-50">
      {result && isJsonResult(result) ? (
        <StatisticsFooter
          statistics={{ ...result.statistics, rows: result.data.length }}
        />
      ) : (
        <div></div>
      )}

      <div className="flex flex-row justify-end items-center gap-2 divide-x divide-gray-300 border-l border-l-gray-300">
        <div className="stat">v{APP_VERSION}</div>
        <a
          className="stat hover:underline"
          href="https://raw.githubusercontent.com/antoniovizuete/clickhouser/main/DISCLAIMER.md"
          target="_blank"
          rel="noreferrer"
        >
          Disclaimer
        </a>
        <a
          className="stat hover:underline"
          href="https://github.com/antoniovizuete/clickhouser"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

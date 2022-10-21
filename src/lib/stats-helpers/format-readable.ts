const formatReadable = (number = 0, decimals = 2, units: string[] = []) => {
  const k = 1000;
  const i = number ? Math.floor(Math.log(number) / Math.log(k)) : 0;
  const unit = units[i];
  const factor = Math.pow(k, i);

  const dm = i !== 0 ? (number % factor !== 0 ? decimals : 0) : 0;
  return Number(number / factor).toFixed(dm) + unit;
};

export function formatReadableBytes(bytes: number) {
  const units = [" B", " kB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"];

  return formatReadable(bytes, 2, units);
}

export function formatReadableRows(rows: number) {
  const units = [
    "",
    " thousand",
    " million",
    " billion",
    " trillion",
    " quadrillion",
  ];

  return formatReadable(rows, 2, units);
}

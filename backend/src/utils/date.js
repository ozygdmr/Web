export function parseDate(value) {
  if (typeof value !== "string") {
    return value;
  }

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) {
    return new Date(NaN);
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return new Date(NaN);
  }

  return date;
}

export function formatDate(tarih) {
  if (!(tarih instanceof Date)) {
    return tarih;
  }

  const day = String(tarih.getUTCDate()).padStart(2, "0");
  const month = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  const year = String(tarih.getUTCFullYear()).padStart(4, "0");
  return `${day}-${month}-${year}`;
}

export function todayStart() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}

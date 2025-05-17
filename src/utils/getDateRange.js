import formatDate from "./formatDate";

export default function getDateRange(option) {
  const today = new Date();
  let start, end;

  switch (option) {
    case 0:
      start = new Date(today);
      end = new Date(today);
      break;

    case 1:
      const dayOfWeek = today.getDay();
      const diffToMonday = (dayOfWeek + 6) % 7;
      start = new Date(today);
      start.setDate(today.getDate() - diffToMonday);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      break;

    case 2:
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;

    case 3:
      start = new Date(today.getFullYear(), 0, 1);
      end = new Date(today.getFullYear(), 11, 31);
      break;
  }

  return { start: formatDate(start), end: formatDate(end) };
}
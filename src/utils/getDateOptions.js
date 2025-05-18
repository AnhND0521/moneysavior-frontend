import {
  formatDateCustom,
  formatDateISO,
  formatMonth,
  formatWeek,
  formatYear,
} from "./dateFormatter";

export default function getDateOptions(option) {
  const today = new Date();
  const range = [];

  switch (option) {
    case 0: {
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        range.push({
          label: formatDateCustom(date),
          start: formatDateISO(date),
          end: formatDateISO(date),
        });
      }
      return range;
    }

    case 1: {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + 1);
      if (date > today) date.setDate(date.getDate() - 7);
      for (let i = 0; i < 8; i++) {
        const start = new Date(date);
        start.setDate(date.getDate() - i * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        range.push({
          label: formatWeek(start, end),
          start: formatDateISO(start),
          end: formatDateISO(end),
        });
      }
      return range;
    }

    case 2: {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      for (let i = 0; i < 12; i++) {
        const start = new Date(startOfMonth);
        start.setMonth(start.getMonth() - i);
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        range.push({
          label: formatMonth(start),
          start: formatDateISO(start),
          end: formatDateISO(end),
        });
      }
      return range;
    }

    case 3: {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      for (let i = 0; i < 10; i++) {
        const start = new Date(startOfYear);
        start.setFullYear(start.getFullYear() - i);
        const end = new Date(endOfYear);
        end.setFullYear(end.getFullYear() - i);
        range.push({
          label: formatYear(start),
          start: formatDateISO(start),
          end: formatDateISO(end),
        });
      }
      return range;
    }
  }
}

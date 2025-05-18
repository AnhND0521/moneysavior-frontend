const getYYYY = (date) => date.getFullYear();
const getMM = (date) => String(date.getMonth() + 1).padStart(2, '0');
const getDD = (date) => String(date.getDate()).padStart(2, '0');

export function formatDateISO(date) {
  return `${getYYYY(date)}-${getMM(date)}-${getDD(date)}`;
}

export function formatDateCustom(date) {
  return `${getDD(date)}/${getMM(date)}/${getYYYY(date)}`;
}

export function formatWeek(startDate, endDate) {
  return `${getDD(startDate)}/${getMM(startDate)} - ${getDD(endDate)}/${getMM(endDate)}`;
}

export function formatMonth(date) {
  return `${getMM(date)}/${getYYYY(date)}`;
}

export function formatYear(date) {
  return `${getYYYY(date)}`;
}
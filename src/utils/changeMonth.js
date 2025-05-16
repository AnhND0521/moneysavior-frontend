export default function changeMonth(month, year, amount) {
  let newMonth = month + amount;
  let newYear = year;
  if (newMonth == 13) {
    newMonth = 1;
    newYear++;
  }
  else if (newMonth == 0) {
    newMonth = 12;
    newYear--;
  }
  return { newMonth, newYear }
}
function returnDateString(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let s = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  return s;
}

function returnDateStringWithoutMonth(date) {
  let s = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return s;
}

export { returnDateString, returnDateStringWithoutMonth };

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

function returnBeautifulDateStrings(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let s = `${weekday[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  }`;
  return s;
}

function returnDateStringWithoutMonth(date) {
  let s = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return s;
}

function withOut(arr1, arr2) {
  let arr3 = [];
  for (let i = 0; i < arr1.length; i++) {
    let flag = false;
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        flag = true;
        arr2.splice(j, 1);
        break;
      }
    }
    if (!flag) {
      arr3.push(arr1[i]);
    }
  }
  return arr3;
}

export {
  returnDateString,
  returnBeautifulDateStrings,
  returnDateStringWithoutMonth,
  withOut,
};

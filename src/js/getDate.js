// const weekdays = {
//   0: "Sunday",
//   1: "Monday",
//   2: "Tuesday",
//   3: "Wednesday",
//   4: "Thursday",
//   5: "Friday",
//   6: "Saturday",
// };

// const getDateFunction = () => {
//   const day = new Date().getDay();
//   const dayName = weekdays[day]; //  Get the current day of the week in word format
//   const dayMonth = new Date().toLocaleString("default", { month: "short" }); //  get current month in short word format
//   const dayDate = new Date().getDate(); //  get current day in number format
//   const dayYear = new Date().getFullYear(); //  get current year in #### format

//   return `${dayName} ${dayDate} of ${dayMonth} ${dayYear}`;
// };

// export default getDateFunction;

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDateFunction = () => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const dayName = weekdays[day];
  const dayMonth = currentDate.toLocaleString("default", { month: "short" });
  const dayDate = currentDate.getDate();
  const dayYear = currentDate.getFullYear();

  return `${dayName} ${dayDate} of ${dayMonth} ${dayYear}`;
};

export default getDateFunction;

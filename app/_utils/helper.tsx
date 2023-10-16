export function convertDateAndTime(myDate: Date) {
  const date = new Date(myDate);

  //  an array of month names
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
  // Get the day, month, year, hours, and minutes from the date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedDate = `${day} ${month} ${year} at ${formattedHours}:${
    (minutes < 10 ? "0" : "") + minutes
  } ${amOrPm}`;

  return formattedDate;
}

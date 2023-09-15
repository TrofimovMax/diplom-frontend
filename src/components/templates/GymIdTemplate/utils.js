export const createDataTimeUTC = (date, time) => {
  return new Date().getFullYear() + "-" + date.substring(3, 5) + "-" + date.substring(0, 2) + " " + time;
}
import keys from "lodash/keys";

export const timeInit = (dayDate, time, schedule) => {
  /*
  dayDate = 'Mon 10/04' ...
  day = 'mon'
  time = start_at
  schedule = {
    fri: { 12:00: '20:00' },
    mon: { 09:00: '17:00' },
    sat: { 11:00: '18:00' },
    thu: { 18:00: '23:00' },
    tue: { 10:00: '16:00' },
    wed: { 09:00: '17:00' }
  }
  */
  const day = dayDate.substring(0,3).toLowerCase(); // change this str 'Mon 10/04' to 'mon'
  const start = keys(schedule[day])[0]; // key - fri
  const obj = schedule[day]; //object day by key - { 12:00: '20:00' }
  const end = obj[start]; // value of key
  if(time >= Number(start.split(/:\d\d/)[0]) && time < Number(end.split(/:\d\d/)[0])){
    return true
  }
  return false
}

export const createWeekSchedule = () => {
  let curr = new Date;
  let week = [];

  for (let i = 1; i <= 6; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  return week;
}
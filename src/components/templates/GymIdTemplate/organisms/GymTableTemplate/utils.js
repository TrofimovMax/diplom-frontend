import keys from "lodash/keys";
import moment from "moment";

export const hasHourInSchedule = (dayDate, hour, schedule) => {
  /*
  dayDate = 'Mon 10/04' ...
  day = 'mon'
  hour = start_at
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
  if(hour > Number(start.split(/:\d\d/)[0]) && hour <= Number(end.split(/:\d\d/)[0])){
    return true
  }
  return false
}

export const createWeekSchedule = () => {
  const today = moment().utc();
  const startWeek = today.weekday();
  const endWeek = startWeek + 7;
  const arrayWeek = [];
  for (let i = startWeek; i < endWeek; i++) {
    arrayWeek.push(today.weekday(i).format('ddd DD/MM'));
  }
  return arrayWeek;
}
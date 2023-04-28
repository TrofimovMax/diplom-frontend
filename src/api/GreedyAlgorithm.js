import { getEntityCountByTime } from "@/components/templates/GymIdTemplate/molecules/CellEditContent/utils";
import { hours, days } from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/constants";
export const GreedyAlgorithm = (raw, capacity, bookings, wishes) => {
  const MAX_HOURS = 8; // Максимальное количество рабочих часов

  const newSchedule = [];
  days.map(day => {
    const dayWeek = day.substring(0,3)
    const schedule = [];
    const array = [];
    hours.map(hour => {
      const time = (hour-1);
      const customers = getEntityCountByTime(bookings, day,hour-1) + getEntityCountByTime(wishes, day,hour-1)
      array.push({ time: time, customers: customers })
    })
    array.sort((a, b) => b.customers - a.customers);
    // Выбираем часы для работы зала
    for (let i = 0; i < array.length; i++) {
      const hour = array[i];
      if (schedule.length < MAX_HOURS) {
        schedule.push(hour);
      }
      if (schedule.length === MAX_HOURS) {
        break;
      }
    }
    const sortedSchedule = _.sortBy(schedule, (o) => o.time);
    newSchedule.push({[dayWeek]: sortedSchedule})
  })
  return newSchedule;
}



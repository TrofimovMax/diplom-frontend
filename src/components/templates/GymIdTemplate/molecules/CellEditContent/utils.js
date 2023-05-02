import moment from "moment/moment";
import filter from "lodash/filter";
import {first, keys, values} from "lodash";
export const getDayStartTime = (day) => first(keys(day))

export const getDayEndTime = (day) => first(values(day))
export const getEntityCountByTime = (entityWeeks, day, hour) => {
  const hourFormat = moment(hour, 'HH:mm:ss').format('HH:mm:ss')
  const start = `${day} ${hourFormat}`;
  const preparedEntity = entityWeeks.map((item) => {
    return {
      ...item,
      start: moment(item.start_at).utc().format('ddd DD/MM HH:mm:ss')
    }
  })
  const entitiesByTime = filter( preparedEntity, { start })
  return entitiesByTime.length
}
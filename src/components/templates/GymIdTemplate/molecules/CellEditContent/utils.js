import moment from "moment/moment";
import filter from "lodash/filter";
import {first, keys, values} from "lodash";
export const getDayStartTime = (day) => first(keys(day))

export const getDayEndTime = (day) => first(values(day))
export const getEntityCountByTime = (entityWeeks, day, hour) => {
  const start = `${day} ${hour}`;
  const preparedEntity = entityWeeks.map((item) => {
    return {
      ...item,
      start: moment(item.start_at).utc().format('ddd DD/MM h')
    }
  })
  const entitiesByTime = filter( preparedEntity, { start })
  return entitiesByTime.length
}
import moment from "moment/moment";
import filter from "lodash/filter";
import {first, keys, values} from "lodash";
export const getDayStartTime = (day) => first(keys(day))

export const getDayEndTime = (day) => first(values(day))

export const getEntityByTime = (entityWeeks, day, hour) => {
  const hourFormat = moment(hour, 'HH:mm:ss').format('HH:mm:ss')
  const start = `${day} ${hourFormat}`;
  const preparedEntity = entityWeeks.map((item) => {
    return {
      ...item,
      start: moment(item.start_at).utc().format('ddd DD/MM HH:mm:ss')
    }
  })
  const entitiesByTime = filter( preparedEntity, { start })
  return entitiesByTime;
}
export const getEntityCountByTime = (entityWeeks, day, hour) => {
  return getEntityByTime(entityWeeks, day, hour).length
}
export const getEntityIdByUserId = (id, entity, day, hour) => {
  const entityByTime = getEntityByTime(entity, day, hour-1);
  const entityById = entityByTime.filter(book => book.user_id === id)
  return entityById[0]?.id || null;
}
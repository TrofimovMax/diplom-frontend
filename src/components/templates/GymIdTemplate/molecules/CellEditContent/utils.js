import moment from "moment/moment";
import filter from "lodash/filter";
import { first, keys, values } from "lodash";
import { days } from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/constants";
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
  const entitiesByTime = filter(preparedEntity, { start })
  return entitiesByTime;
}
export const getEntityCountByTime = (entityWeeks, day, hour) => {
  return getEntityByTime(entityWeeks, day, hour).length
}
export const getEntityIdByUserId = (id, entity, day, hour) => {
  const entityByTime = getEntityByTime(entity, day, hour - 1);
  const entityById = entityByTime.filter(item => item.user_id === id)
  return entityById[0]?.id || null;
}

export const getEntityCountByUserId = (id, entity) => {
  const entityById = entity.filter(item => item.user_id === id)
  const startM = days[0];
  //const endM = days[6];
  const start = moment(startM, "ddd DD/MM");
  //const end = moment(endM, "ddd DD/MM");

  const filteredEntity = entityById.filter(item => {
    const before = moment(item.start_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").isAfter(start);
    // const after = moment(item.start_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").isBefore(end);
    return item.user_id === id && before;
  });

  return filteredEntity.length
}

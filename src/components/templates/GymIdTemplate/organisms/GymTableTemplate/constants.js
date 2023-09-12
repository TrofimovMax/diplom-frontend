import {createWeekSchedule} from "@components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";

export const hours = [...Array(24).keys()].map(x => ++x);
export const days = createWeekSchedule()
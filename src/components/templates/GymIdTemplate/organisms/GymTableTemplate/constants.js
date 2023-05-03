import {createWeekSchedule} from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate/utils";
import moment from "moment/moment";

export const hours = [...Array(24).keys()].map(x => ++x);
export const days = createWeekSchedule()
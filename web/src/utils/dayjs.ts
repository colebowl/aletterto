import baseDayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
export { Dayjs } from "dayjs";

baseDayjs.extend(utc);
baseDayjs.extend(timezone);

export const dayjs = baseDayjs;

export const standardDateFormat = "YYYY-MM-DD h:mm a";

export const getDateInLocalTime = (
  dateString?: string,
  format = standardDateFormat
) => {
  return baseDayjs.utc(dateString).tz(dayjs.tz.guess()).format(format);
};

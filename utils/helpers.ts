import { DateTime } from "luxon";
export const formateDate = (dateTime: string) => {
    const date = new Date(dateTime);

    // month
    const options: Intl.DateTimeFormatOptions = { month: 'short', timeZone: 'UTC' };
    const month = date.toLocaleString('en-US', options);

    // day
    const day = date.getUTCDate();

    // format time utc 12
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
    const time = date.toLocaleString('en-US', timeOptions);

    // final string
    return `${month} ${day} at ${time}`;
}

export const toUTCDateTime = (dateTime: string) => {
    return DateTime.fromISO(dateTime, { zone: 'utc' }).toUTC();
}
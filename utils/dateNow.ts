import { format } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';
import { getDay } from 'date-fns';
/**
 * @typedef dateNow
 * @property {Date} date_timestamp
 * @property {String} day
 * @property {String} date
 * @property {String} full_string
 * @property {String} hours
 * @property {String} month
 * @property {String} timestamp
 * @property {String} week_day
 * @property {String} week_day_string
 * @property {String} year
*/
/**
 *
 * @param {String | Date} date
 * @returns {Object} dateNow
*/
interface DateNow {
    date_timestamp: Date;
    day: string;
    date: string;
    full_string: string;
    hours: string;
    month: string;
    timestamp: Date;
    week_day: number;
    week_day_string: string;
    year: string;
}

function dateNow(date: string | Date = new Date()): DateNow {
    date = date ? new Date(date) : new Date();
    return {
        date_timestamp: date,
        day: format(date, "dd", { locale: enUS }),
        date: format(date, "yyyy-MM-dd", { locale: enUS }),
        full_string: format(date, "EEEE, MMMM d, yyyy, 'at' h:mm a", { locale: enUS }),
        hours: format(date, "hh:mm a", { locale: enUS }),
        month: format(date, "MM", { locale: enUS }),
        timestamp: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
        week_day: getDay(date),
        week_day_string: format(date, "EEEE", { locale: enUS }),
        year: format(date, "yyyy", { locale: enUS }),
    };
};

export default dateNow;
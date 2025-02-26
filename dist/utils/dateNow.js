"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_tz_1 = require("date-fns-tz");
const locale_1 = require("date-fns/locale");
const date_fns_1 = require("date-fns");
function dateNow(date = new Date()) {
    date = date ? new Date(date) : new Date();
    return {
        date_timestamp: date,
        day: (0, date_fns_tz_1.format)(date, "dd", { locale: locale_1.enUS }),
        date: (0, date_fns_tz_1.format)(date, "yyyy-MM-dd", { locale: locale_1.enUS }),
        full_string: (0, date_fns_tz_1.format)(date, "EEEE, MMMM d, yyyy, 'at' h:mm a", { locale: locale_1.enUS }),
        hours: (0, date_fns_tz_1.format)(date, "hh:mm a", { locale: locale_1.enUS }),
        month: (0, date_fns_tz_1.format)(date, "MM", { locale: locale_1.enUS }),
        timestamp: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
        week_day: (0, date_fns_1.getDay)(date),
        week_day_string: (0, date_fns_tz_1.format)(date, "EEEE", { locale: locale_1.enUS }),
        year: (0, date_fns_tz_1.format)(date, "yyyy", { locale: locale_1.enUS }),
    };
}
;
exports.default = dateNow;
//# sourceMappingURL=dateNow.js.map
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
declare function dateNow(date?: string | Date): DateNow;
export default dateNow;

import moment, { unix } from "moment"

export const getDateFromNow = (date: any) => {
    const CONFIG = {
        future: "in %s",
        past: "%s ago",
        s: "%ds",
        ss: "%ds",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1mo",
        MM: "%dmo",
        y: "1y",
        yy: "%dy"
    };

    moment.updateLocale("en", { relativeTime: CONFIG });
    return moment(unix(date.toString())).fromNow();
}
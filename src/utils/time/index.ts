const DISPLAY_LOCALE = 'en-GB';

/**
 * Formats an ISO calendar date (YYYY-MM-DD) as a day-month-year string
 * with a long month name, e.g. 2026-12-08 → 8 December 2026.
 */
const formatIsoDateString = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-').map(Number);
    const adjustedMonth = month - 1;
    const date = new Date(year, adjustedMonth, day);

    return new Intl.DateTimeFormat(DISPLAY_LOCALE, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

const time = {
    formatIsoDateString
};

export default time;

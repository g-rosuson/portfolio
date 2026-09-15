import { z } from 'zod';

const DD_MM_YYYY = /^(\d{2})-(\d{2})-(\d{4})$/;

/**
 * Validates a date string in the format DD-MM-YYYY.
 * @private
 */
const isDateValid = (value: string): boolean => {
    const match = DD_MM_YYYY.exec(value);

    if (!match) {
        return false;
    }

    // Determine the day, month, and year from the value.
    const dayFromValue = Number(match[1]);
    // UTC months are 0-indexed, therefore we need to subtract 1 from the month value
    const monthFromValue = Number(match[2]) - 1;
    const yearFromValue = Number(match[3]);

    // Create an UTC timestamp
    const date = new Date(Date.UTC(yearFromValue, monthFromValue, dayFromValue));

    // Validate the year, month, and day
    const isValidDay = date.getUTCDate() === dayFromValue;
    const isValidYear = date.getUTCFullYear() === yearFromValue;
    const isValidMonth = date.getUTCMonth() === monthFromValue;

    return isValidYear && isValidMonth && isValidDay;
};

const articleFrontmatterSchema = z.object({
    title: z.string().min(1),
    date: z.string().refine(isDateValid, {
        message: 'Date must be a valid calendar date in DD-MM-YYYY'
    }),
    description: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
    ogImage: z.string().min(1)
});

const articleSchema = articleFrontmatterSchema.extend({
    slug: z.string().min(1),
    source: z.string(),
    readingTimeMinutes: z.number().int().min(1)
});

export { articleFrontmatterSchema, articleSchema };

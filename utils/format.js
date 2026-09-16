/** Formatting helpers shared by every screen (kept identical to the pre-migration output). */

export const money = (value) => `${new Intl.NumberFormat('en-SE', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value)} kr`;

export const formatDate = (value) => new Date(value).toLocaleDateString('en-GB');

export const pluralize = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;

export const joinList = (values, separator = ', ') => values.filter(Boolean).join(separator);

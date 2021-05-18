// @flow
import { format } from 'd3';

export const date = (s: string, invalidMessage: ?string): string => {
    const d = new Date(s);
    if (Number.isNaN(d.valueOf())) {
        return invalidMessage || 'Invalid date';
    }
    return d.toLocaleDateString();
};

export const dateUTC = (s: string) => {
    const [year, month, day] = s.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

export const precision = (value: number, decimals: number = 1, toLocale: boolean = true) => format(`${toLocale ? ',.' : '.'}${decimals}f`)(value);

export const titleCase = (s: string): string => `${s[0].toUpperCase()}${s.substring(1)}`;

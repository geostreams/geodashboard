// @flow
import { format } from 'd3'

export const date = (s: string): string => new Date(s).toLocaleDateString()

export const precision = (value: number, decimals: number = 1, toLocale: boolean = true) => format(`${toLocale ? ',.' : '.'}${decimals}f`)(value)

export const titleCase = (s: string): string => `${s[0].toUpperCase()}${s.substring(1)}`

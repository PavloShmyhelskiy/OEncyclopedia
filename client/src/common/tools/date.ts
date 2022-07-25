import { format, parseISO } from 'date-fns'
export {
  add,
  addSeconds,
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  isDate,
  parse,
  parseISO,
  subDays,
} from 'date-fns'

const parseDate = (date: string | Date) =>
  typeof date === 'string' ? parseISO(date) : date

export const dateFormatter = {
  date: (date: string | Date, divider = '.') =>
    format(parseDate(date), `dd${divider}MM${divider}yyyy`),
  shortDate: (date: string | Date, divider = '.') =>
    format(parseDate(date), `dd${divider}MM`),
  fullDate: (date: string | Date, divider = '/') =>
    format(parseDate(date), `HH:mm:ss dd${divider}MM${divider}yyyy`),
  month: (date: string | Date, divider = '.') =>
    format(parseDate(date), `dd${divider}MM${divider}yy`),
  time: (date: string | Date) => format(parseDate(date), 'HH:mm'),
}

export const getTimestamp = () => new Date().toISOString()

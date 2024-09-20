import { DateTime } from 'luxon'

const isWithinWeek = (date: Date, currentDate: Date) =>
  Math.abs(date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) < 7

export const getDateString = (
  date: string,
  options?: { format?: 'relative' | 'full' }
) => {
  const objectDate = DateTime.fromISO(date + '+07:00').setLocale('id')
  const currentDate = DateTime.now()
  const format = options?.format ?? 'relative'
  if (
    format === 'relative' &&
    isWithinWeek(objectDate.toJSDate(), currentDate.toJSDate())
  ) {
    return objectDate.toRelative({ base: currentDate })
  } else {
    return objectDate.toLocaleString(DateTime.DATE_HUGE)
  }
}

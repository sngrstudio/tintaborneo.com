import { intlFormatDistance } from 'date-fns'

const isWithinWeek = (date: Date, currentDate: Date) =>
  Math.abs(date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) < 7

export const getDateString = (
  date: Date,
  options?: { format?: 'relative' | 'full' }
) => {
  const currentDate = new Date()
  const format = options?.format ?? 'relative'
  if (format === 'relative' && isWithinWeek(date, currentDate)) {
    return intlFormatDistance(date, currentDate, {
      locale: 'id'
    })
  } else {
    return date.toLocaleDateString('id', { dateStyle: 'full' })
  }
}

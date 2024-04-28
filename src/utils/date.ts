import { intlFormatDistance } from 'date-fns'

export const getDateString = (date: Date) => {
  const currentDate = new Date()
  if (date.getDate() === currentDate.getDate()) {
    return intlFormatDistance(date, currentDate, {
      locale: 'id',
      unit: 'hour',
    })
  } else {
    return date.toLocaleDateString('id', { dateStyle: 'full' })
  }
}

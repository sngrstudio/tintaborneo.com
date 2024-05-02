import { intlFormatDistance } from 'date-fns'

export const getDateString = (date: Date) => {
  const currentDate = new Date()
  if (date.toDateString() === currentDate.toDateString()) {
    return intlFormatDistance(date, currentDate, {
      locale: 'id',
      unit: 'hour',
    })
  } else {
    return date.toLocaleDateString('id', { dateStyle: 'full' })
  }
}

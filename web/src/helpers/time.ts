export const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const elapsed = now.getTime() - date.getTime() // difference in milliseconds

  const minutes = Math.floor(elapsed / (1000 * 60))
  const hours = Math.floor(elapsed / (1000 * 60 * 60))

  if (minutes < 1) {
    return 'baru saja'
  }
  if (hours < 1) {
    return `${minutes} menit yang lalu`
  }
  if (hours < 24) {
    return `${hours} jam yang lalu`
  }
  return date.toLocaleDateString('id-ID', {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta'
  })
}

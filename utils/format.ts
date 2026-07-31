export function formatNewsDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  // Одна таймзона на SSR и клиенте — без hydration mismatch
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Moscow',
  }).format(date)
}

export function toIsoDate(value: string): string | undefined {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

export function normalizeSearch(value: string): string {
  return value.trim().toLowerCase()
}

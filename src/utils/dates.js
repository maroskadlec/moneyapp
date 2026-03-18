export const QUARTER_START = new Date('2026-04-01') // Q2 starts April 1
export const QUARTER_END = new Date('2026-06-30')

// Use today as start since we're mid-quarter
const EFFECTIVE_START = new Date('2026-03-18')

export function today() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function daysRemaining() {
  const now = today()
  const end = new Date(QUARTER_END)
  end.setHours(0, 0, 0, 0)
  const diff = end - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function totalDays() {
  const start = new Date(EFFECTIVE_START)
  start.setHours(0, 0, 0, 0)
  const end = new Date(QUARTER_END)
  end.setHours(0, 0, 0, 0)
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

export function formatCZK(amount) {
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + ' Kč'
}

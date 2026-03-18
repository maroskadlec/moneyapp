import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { today, QUARTER_END, totalDays, daysRemaining } from '../utils/dates'
import { formatCZK } from '../utils/dates'
import styles from './TrendChart.module.css'

const EFFECTIVE_START = new Date('2026-03-18')

function buildChartData(budget, expenses) {
  const total = totalDays()
  const daysLeft = daysRemaining()
  const daysElapsed = Math.max(1, total - daysLeft)

  // Build daily spending map
  const spendByDay = {}
  expenses.forEach(e => {
    const d = new Date(e.date)
    d.setHours(0, 0, 0, 0)
    const start = new Date(EFFECTIVE_START)
    start.setHours(0, 0, 0, 0)
    const idx = Math.round((d - start) / (1000 * 60 * 60 * 24))
    spendByDay[idx] = (spendByDay[idx] || 0) + e.amount
  })

  // Ideal: linear depletion
  const data = []
  let cumActual = 0
  const todayIdx = daysElapsed

  for (let i = 0; i <= total; i++) {
    const ideal = budget - (budget / total) * i
    cumActual += spendByDay[i] || 0
    const actual = i <= todayIdx ? budget - cumActual : null

    const label = i === 0 ? '1.4.' :
      i === Math.floor(total / 2) ? 'polovina' :
      i === total ? '30.6.' : null

    data.push({ i, ideal: Math.round(ideal), actual: actual !== null ? Math.round(actual) : null, label })
  }

  return data
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      {payload.map(p => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>{p.name === 'ideal' ? 'plán' : 'skutečnost'}</span>
          <span>{formatCZK(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function TrendChart({ budget, expenses }) {
  const data = useMemo(() => buildChartData(budget, expenses), [budget, expenses])

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Trend zbývajícího budgetu</div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fontFamily: 'Courier New', fill: '#9e9b96' }}
            tickLine={false}
            axisLine={{ stroke: '#c4c0b8' }}
            interval={0}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="ideal"
            name="ideal"
            stroke="#c4c0b8"
            strokeWidth={1}
            dot={false}
            strokeDasharray="4 3"
          />
          <Line
            type="monotone"
            dataKey="actual"
            name="actual"
            stroke="#1a1917"
            strokeWidth={1.5}
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        <span className={styles.legendIdeal}>— — plán</span>
        <span className={styles.legendActual}>—— skutečnost</span>
      </div>
    </div>
  )
}

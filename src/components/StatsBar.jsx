import { formatCZK } from '../utils/dates'
import styles from './StatsBar.module.css'

export default function StatsBar({ dailyBudget, daysLeft, projectedRemaining, quarterEnd }) {
  const endLabel = quarterEnd.toLocaleDateString('cs-CZ', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.value}>{formatCZK(dailyBudget)}</span>
        <span className={styles.label}>denní limit</span>
      </div>
      <div className={styles.item}>
        <span className={styles.value}>{daysLeft}</span>
        <span className={styles.label}>dní zbývá</span>
      </div>
      <div className={styles.item}>
        <span className={`${styles.value} ${projectedRemaining < 0 ? styles.negative : ''}`}>
          {formatCZK(projectedRemaining)}
        </span>
        <span className={styles.label}>odhad zbytku</span>
      </div>
    </div>
  )
}

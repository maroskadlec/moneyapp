import { formatCZK } from '../utils/dates'
import styles from './Header.module.css'

export default function Header({ budget, remaining, onEditBudget }) {
  const pct = budget > 0 ? Math.max(0, Math.min(100, (remaining / budget) * 100)) : 0

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <span className={styles.label}>MoneyApp</span>
        <button className={styles.editBtn} onClick={onEditBudget}>
          upravit budget
        </button>
      </div>

      <div className={styles.amounts}>
        <div className={styles.remaining}>
          <span className={styles.remainingValue}>{formatCZK(remaining)}</span>
          <span className={styles.remainingLabel}>zbývá</span>
        </div>
        <div className={styles.budget}>
          <span className={styles.budgetLabel}>z</span>
          <span className={styles.budgetValue}>{formatCZK(budget)}</span>
        </div>
      </div>

      <div className={styles.barWrap}>
        <div className={styles.bar} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.barLabels}>
        <span>{Math.round(pct)} % zbývá</span>
      </div>
    </header>
  )
}

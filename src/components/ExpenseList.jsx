import { formatDate, formatCZK } from '../utils/dates'
import styles from './ExpenseList.module.css'

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className={styles.empty}>
        Žádné výdaje zatím nebyly zadány.
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.sectionTitle}>Výdaje</span>
        <span className={styles.count}>{expenses.length} položek</span>
      </div>
      <ul className={styles.list}>
        {expenses.map(e => (
          <li key={e.id} className={styles.item}>
            <span className={styles.date}>{formatDate(e.date)}</span>
            <span className={styles.amount}>{formatCZK(e.amount)}</span>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(e.id)}
              aria-label="Smazat výdaj"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
              <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

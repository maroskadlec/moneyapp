import { formatCZK } from '../utils/dates'
import styles from './PaceAlert.module.css'

export default function PaceAlert({ avgDailySpend, dailyBudget }) {
  const over = avgDailySpend - dailyBudget

  return (
    <div className={styles.alert}>
      <span className={styles.icon}>!</span>
      <span>
        Průměrné denní utrácení je {formatCZK(avgDailySpend)}, o {formatCZK(over)} více než
        doporučený denní limit {formatCZK(dailyBudget)}. Tempo překračuje plán.
      </span>
    </div>
  )
}

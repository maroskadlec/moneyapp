import { useState } from 'react'
import styles from './BudgetSetup.module.css'

export default function BudgetSetup({ onSet }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = parseFloat(value.replace(',', '.').replace(/\s/g, ''))
    if (!num || num <= 0) return
    onSet(num)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.appName}>MoneyApp</div>
        <h1 className={styles.heading}>Nastavení budgetu</h1>
        <p className={styles.sub}>
          Zadej celkový budget pro aktuální kvartál<br />
          (18. 3. 2026 — 30. 6. 2026)
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={value}
              onChange={e => setValue(e.target.value)}
              min="1"
              step="any"
              autoFocus
            />
            <span className={styles.currency}>Kč</span>
          </div>
          <button className={styles.btn} type="submit">Začít sledovat</button>
        </form>
      </div>
    </div>
  )
}

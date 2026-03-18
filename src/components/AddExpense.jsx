import { useState } from 'react'
import styles from './AddExpense.module.css'

export default function AddExpense({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = parseFloat(value.replace(',', '.'))
    if (!num || num <= 0) return
    onAdd(num)
    setValue('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="number"
          inputMode="decimal"
          placeholder="Částka v Kč"
          value={value}
          onChange={e => setValue(e.target.value)}
          min="0"
          step="any"
        />
        <button className={styles.btn} type="submit">Přidat výdaj</button>
      </div>
    </form>
  )
}

import { useState, useEffect } from 'react'
import Header from './components/Header'
import BudgetSetup from './components/BudgetSetup'
import StatsBar from './components/StatsBar'
import PaceAlert from './components/PaceAlert'
import AddExpense from './components/AddExpense'
import TrendChart from './components/TrendChart'
import ExpenseList from './components/ExpenseList'
import { QUARTER_END, daysRemaining, totalDays } from './utils/dates'

const STORAGE_KEY_BUDGET = 'moneyapp_budget'
const STORAGE_KEY_EXPENSES = 'moneyapp_expenses'

export default function App() {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BUDGET)
    return saved ? Number(saved) : null
  })

  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_EXPENSES)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (budget !== null) localStorage.setItem(STORAGE_KEY_BUDGET, String(budget))
  }, [budget])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses))
  }, [expenses])

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0)
  const remaining = (budget ?? 0) - totalSpent
  const daysLeft = daysRemaining()
  const dailyBudget = daysLeft > 0 ? remaining / daysLeft : 0

  const daysElapsed = Math.max(1, totalDays() - daysLeft)
  const avgDailySpend = totalSpent / daysElapsed
  const projectedSpend = avgDailySpend * totalDays()
  const projectedRemaining = (budget ?? 0) - projectedSpend

  const overPace = budget !== null && daysElapsed > 0 && avgDailySpend > (budget / totalDays())

  const addExpense = (amount) => {
    setExpenses(prev => [
      { id: Date.now(), amount, date: new Date().toISOString() },
      ...prev,
    ])
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  if (budget === null) {
    const previousBudget = Number(localStorage.getItem(STORAGE_KEY_BUDGET)) || null
    return (
      <BudgetSetup
        onSet={setBudget}
        onCancel={previousBudget ? () => setBudget(previousBudget) : null}
      />
    )
  }

  return (
    <div>
      <Header
        budget={budget}
        remaining={remaining}
        onEditBudget={() => setBudget(null)}
      />
      <StatsBar
        dailyBudget={dailyBudget}
        daysLeft={daysLeft}
        projectedRemaining={projectedRemaining}
        quarterEnd={QUARTER_END}
      />
      {overPace && (
        <PaceAlert avgDailySpend={avgDailySpend} dailyBudget={budget / totalDays()} />
      )}
      <AddExpense onAdd={addExpense} />
      <TrendChart budget={budget} expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  )
}

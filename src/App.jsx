import { useState, useMemo, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { Summary } from './components/Summary'
import { FilterBar } from './components/FilterBar'
import { TransactionChart } from './components/TransactionChart'
import { exportToCSV } from './utils/exportCSV'
import { CATEGORIES } from './constants'

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', [])
  const [filter, setFilter] = useState({ type: 'all', category: 'all', search: '' })

  const addTransaction = useCallback((newTx) => {
    setTransactions((prev) => [newTx, ...prev])
  }, [setTransactions])

  const deleteTransaction = useCallback((id) => {
    if (window.confirm('Удалить операцию?')) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id))
    }
  }, [setTransactions])

  const clearAll = useCallback(() => {
    if (window.confirm('Удалить все данные?')) {
      setTransactions([])
    }
  }, [setTransactions])

  const handleExport = useCallback(() => {
    exportToCSV(transactions)
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filter.type === 'all' || tx.type === filter.type
      const matchesCategory = filter.category === 'all' || tx.category === filter.category
      const matchesSearch = tx.description.toLowerCase().includes(filter.search.toLowerCase())
      return matchesType && matchesCategory && matchesSearch
    })
  }, [transactions, filter])

  const summary = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)
    const expense = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  const expenseTransactions = useMemo(() => 
    transactions.filter(tx => tx.type === 'expense'), 
  [transactions])
  
  const incomeTransactions = useMemo(() => 
    transactions.filter(tx => tx.type === 'income'), 
  [transactions])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Учет расходов</h1>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleExport}
              disabled={transactions.length === 0}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium border border-gray-300 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-active"
            >
              Экспорт
            </button>
            <button
              onClick={clearAll}
              disabled={transactions.length === 0}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium border border-red-300 text-red-600 rounded-xl bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-active"
            >
              Очистить
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <TransactionForm onAdd={addTransaction} />
            
            <FilterBar
              type={filter.type}
              category={filter.category}
              search={filter.search}
              count={filteredTransactions.length}
              onTypeChange={(e) => setFilter((prev) => ({ ...prev, type: e.target.value, category: 'all' }))}
              onCategoryChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
              onSearchChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
              onClear={() => setFilter({ type: 'all', category: 'all', search: '' })}
            />
            
            <TransactionList
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
            />
          </div>

          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <Summary
              income={summary.income}
              expense={summary.expense}
              balance={summary.balance}
            />
            
            {expenseTransactions.length > 0 && (
              <TransactionChart transactions={expenseTransactions} type="expense" />
            )}
            
            {incomeTransactions.length > 0 && (
              <TransactionChart transactions={incomeTransactions} type="income" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

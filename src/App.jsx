import { useState, useMemo, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { Summary } from './components/Summary'
import { FilterBar } from './components/FilterBar'
import { TransactionChart } from './components/TransactionChart'
import { Settings } from './components/Settings'
import { Documentation } from './components/Documentation'
import { exportTransactions } from './utils/exportData'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [transactions, setTransactions] = useLocalStorage('transactions', [])
  const [filter, setFilter] = useState({ type: 'all', category: 'all', search: '' })
  const [chartType, setChartType] = useState('expense')
  const [exportFormat, setExportFormat] = useState('csv')

  const addTransaction = useCallback((newTx) => {
    setTransactions((prev) => [newTx, ...prev])
  }, [setTransactions])

  const deleteTransaction = useCallback((id) => {
    if (window.confirm('Удалить операцию?')) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id))
    }
  }, [setTransactions])

  const handleExport = useCallback(() => {
    exportTransactions(transactions, exportFormat)
  }, [transactions, exportFormat])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filter.type === 'all' || tx.type === filter.type
      const matchesCategory = filter.category === 'all' || tx.category === filter.category
      const matchesSearch = tx.description.toLowerCase().includes(filter.search.toLowerCase())
      return matchesType && matchesCategory && matchesSearch
    })
  }, [transactions, filter])

  const summary = useMemo(() => {
    const income = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0)
    const expense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  const chartData = useMemo(() => 
    transactions.filter(tx => tx.type === chartType), 
  [transactions, chartType])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-card)] sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold tracking-tight truncate">Budget Manager</h1>
            <nav className="flex gap-1 bg-[var(--bg-primary)] p-1 rounded-xl">
              {['home', 'settings', 'docs'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab ? 'bg-[var(--bg-card)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {tab === 'home' ? 'Главная' : tab === 'settings' ? 'Настройки' : 'Документация'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-8 space-y-6">
                <TransactionForm onAdd={addTransaction} />
                
                <FilterBar
                  type={filter.type}
                  category={filter.category}
                  search={filter.search}
                  count={filteredTransactions.length}
                  onTypeChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value, category: 'all' }))}
                  onCategoryChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
                  onSearchChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                  onClear={() => setFilter({ type: 'all', category: 'all', search: '' })}
                />
                
                <TransactionList transactions={filteredTransactions} onDelete={deleteTransaction} />
              </div>

              <div className="lg:col-span-4 space-y-6">
                <Summary
                  income={summary.income}
                  expense={summary.expense}
                  balance={summary.balance}
                />
                
                <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <div className="flex gap-2 mb-4">
                    {['expense', 'income'].map(type => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`flex-1 py-2 text-sm font-medium rounded-xl transition-colors ${chartType === type ? 'bg-blue-600 text-white' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'}`}
                      >
                        {type === 'expense' ? 'Расходы' : 'Доходы'}
                      </button>
                    ))}
                  </div>
                  <TransactionChart transactions={chartData} chartType={chartType} />
                </div>

                <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <h3 className="text-sm font-medium mb-3 text-[var(--text-secondary)]">Экспорт данных</h3>
                  <div className="flex gap-2">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="flex-1 border border-[var(--border-color)] rounded-xl px-3 py-2 bg-[var(--bg-primary)] text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="csv">CSV (Excel)</option>
                      <option value="json">JSON</option>
                      <option value="txt">TXT</option>
                    </select>
                    <button
                      onClick={handleExport}
                      disabled={transactions.length === 0}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-active"
                    >
                      Скачать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Settings />
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Documentation />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

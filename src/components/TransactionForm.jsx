import { useState, useMemo } from 'react'
import { CATEGORIES } from '../constants'

export function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('other')

  const currentCategories = useMemo(() => 
    type === 'income' ? CATEGORIES.income : CATEGORIES.expense, 
  [type])

  const isValid = useMemo(() => {
    const num = parseFloat(amount)
    return num > 0 && description.trim().length >= 2
  }, [amount, description])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return

    onAdd({
      id: crypto.randomUUID(),
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      category,
      date: new Date().toISOString()
    })

    setAmount('')
    setDescription('')
    setCategory(type === 'income' ? 'salary' : 'other')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            setCategory(e.target.value === 'income' ? 'salary' : 'other')
          }}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all touch-active"
        >
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all touch-active"
          required
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all touch-active"
      >
        {currentCategories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.label}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Описание (мин. 2 символа)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all touch-active"
        required
      />

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full font-semibold py-3 rounded-xl transition-all touch-active ${isValid ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        Добавить операцию
      </button>
    </form>
  )
}

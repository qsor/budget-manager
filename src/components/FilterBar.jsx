import { CATEGORIES } from '../constants'

export function FilterBar({ type, category, search, count, onTypeChange, onCategoryChange, onSearchChange, onClear }) {
  const hasActiveFilters = type !== 'all' || category !== 'all' || search.trim() !== ''
  const currentCategories = type === 'income' ? CATEGORIES.income : CATEGORIES.expense

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={type}
            onChange={onTypeChange}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all touch-active"
          >
            <option value="all">Все типы</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
          
          <select
            value={category}
            onChange={onCategoryChange}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all touch-active"
          >
            <option value="all">Все категории</option>
            {currentCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Поиск по описанию"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all touch-active"
          />
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium touch-active whitespace-nowrap"
            >
              Сбросить
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          Найдено: {count}
        </div>
      </div>
    </div>
  )
}

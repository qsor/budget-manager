export function FilterBar({ type, search, count, onTypeChange, onSearchChange, onClear }) {
  const hasActiveFilters = type !== 'all' || search.trim() !== ''

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={type}
          onChange={onTypeChange}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all touch-active"
        >
          <option value="all">Все операции</option>
          <option value="income">Доходы</option>
          <option value="expense">Расходы</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={onSearchChange}
          placeholder="Поиск по описанию"
          className="flex-[2] border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all touch-active"
        />
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium touch-active"
          >
            Сбросить
          </button>
        )}
        <div className="hidden sm:flex items-center justify-center px-3 text-sm text-gray-500 bg-gray-50 rounded-xl">
          Найдено: {count}
        </div>
      </div>
    </div>
  )
}
import { formatCurrency } from '../utils/formatCurrency'

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="group flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all touch-active">
      <div>
        <p className="font-medium text-gray-800">{transaction.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(transaction.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-semibold tabular-nums ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 sm:opacity-100 text-gray-400 hover:text-red-500 transition-all text-xl leading-none touch-active"
          aria-label="Удалить операцию"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
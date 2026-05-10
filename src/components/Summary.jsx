import { formatCurrency } from '../utils/formatCurrency'

export function Summary({ income, expense, balance }) {
  const total = income + expense
  const incomePercent = total > 0 ? Math.round((income / total) * 100) : 0
  const expensePercent = total > 0 ? Math.round((expense / total) * 100) : 0

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div>
        <p className="text-gray-500 text-sm mb-1">Доходы</p>
        <p className="text-green-600 font-bold text-2xl">{formatCurrency(income)}</p>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${incomePercent}%` }}></div>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Расходы</p>
        <p className="text-red-600 font-bold text-2xl">{formatCurrency(expense)}</p>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${expensePercent}%` }}></div>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <p className="text-gray-500 text-sm mb-1">Баланс</p>
        <p className={`font-bold text-2xl ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
          {formatCurrency(balance)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {balance >= 0 ? 'Профицит' : 'Дефицит'}
        </p>
      </div>
    </div>
  )
}
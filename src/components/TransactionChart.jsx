import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { CATEGORY_COLORS, CATEGORIES } from '../constants'

export function TransactionChart({ transactions }) {
  const data = CATEGORIES.map(cat => {
    const sum = transactions
      .filter(tx => tx.category === cat.id && tx.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0)
    return { name: cat.label, value: sum, color: CATEGORY_COLORS[cat.id] }
  }).filter(item => item.value > 0)

  if (data.length === 0) return null

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Структура расходов</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
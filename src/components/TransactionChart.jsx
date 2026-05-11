import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORY_COLORS, CATEGORIES } from '../constants'
import { formatCurrency } from '../utils/formatCurrency'

export function TransactionChart({ transactions, chartType }) {
  const categoryList = chartType === 'income' ? CATEGORIES.income : CATEGORIES.expense
  
  const data = categoryList.map(cat => {
    const sum = transactions
      .filter(tx => tx.category === cat.id && tx.type === chartType)
      .reduce((acc, curr) => acc + curr.amount, 0)
    return { 
      name: cat.label, 
      value: sum, 
      color: CATEGORY_COLORS[cat.id] || CATEGORY_COLORS.other 
    }
  }).filter(item => item.value > 0)

  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (data.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] text-center h-full flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Нет данных для отображения</p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--bg-card)] p-4 sm:p-6 rounded-2xl border border-[var(--border-color)] h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {chartType === 'income' ? 'Источники дохода' : 'Структура расходов'}
        </h3>
        <span className="text-sm text-[var(--text-secondary)]">{formatCurrency(total)}</span>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value)}`, 'Сумма']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-auto custom-scrollbar pr-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[var(--text-secondary)]">{item.name}</span>
              </div>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function exportToCSV(transactions) {
  const headers = ['ID', 'Дата', 'Тип', 'Сумма', 'Описание']
  const rows = transactions.map(tx => [
    tx.id,
    new Date(tx.date).toLocaleString('ru-RU'),
    tx.type === 'income' ? 'Доход' : 'Расход',
    tx.amount.toFixed(2).replace('.', ','),
    `"${tx.description.replace(/"/g, '""')}"`
  ])

  const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n')
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `budget-export-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
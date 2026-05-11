import { formatCurrency } from './formatCurrency'

export function exportTransactions(transactions, format) {
  const timestamp = new Date().toISOString().split('T')[0]
  let content = ''
  let mimeType = ''
  let extension = ''

  if (format === 'csv') {
    const headers = ['ID', 'Дата', 'Тип', 'Категория', 'Сумма', 'Описание']
    const rows = transactions.map(tx => [
      tx.id,
      new Date(tx.date).toLocaleString('ru-RU'),
      tx.type === 'income' ? 'Доход' : 'Расход',
      tx.category,
      tx.amount.toFixed(2).replace('.', ','),
      `"${tx.description.replace(/"/g, '""')}"`
    ])
    content = ['\ufeff' + headers.join(';'), ...rows.map(r => r.join(';'))].join('\n')
    mimeType = 'text/csv;charset=utf-8;'
    extension = 'csv'
  } else if (format === 'json') {
    content = JSON.stringify(transactions, null, 2)
    mimeType = 'application/json'
    extension = 'json'
  } else if (format === 'txt') {
    content = transactions.map(tx => {
      const sign = tx.type === 'income' ? '+' : '-'
      return `[${new Date(tx.date).toLocaleDateString('ru-RU')}] ${sign}${formatCurrency(tx.amount)} | ${tx.category} | ${tx.description}`
    }).join('\n')
    mimeType = 'text/plain;charset=utf-8;'
    extension = 'txt'
  }

  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `budget-export-${timestamp}.${extension}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

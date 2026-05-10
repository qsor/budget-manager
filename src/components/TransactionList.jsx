import { TransactionItem } from './TransactionItem'

export function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-500 mt-4 py-8">Операций не найдено</p>
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
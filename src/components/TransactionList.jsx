import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import TransactionItem from './TransactionItem'

export function TransactionList({ transactions, onDelete }) {
  const parentRef = useRef()

  const rowVirtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5
  })

  if (transactions.length === 0) {
    return <p className="text-center text-gray-500 mt-4 py-8">Операций не найдено</p>
  }

  return (
    <div
      ref={parentRef}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 max-h-96 overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const tx = transactions[virtualRow.index]
          return (
            <div
              key={tx.id}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <TransactionItem transaction={tx} onDelete={onDelete} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

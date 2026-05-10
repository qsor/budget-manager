import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TransactionForm } from '../components/TransactionForm'

describe('TransactionForm', () => {
  it('calls onAdd with correct data on submit', () => {
    const mockAdd = vi.fn()
    render(<TransactionForm onAdd={mockAdd} />)

    fireEvent.change(screen.getByPlaceholderText('Сумма'), { target: { value: '500' } })
    fireEvent.change(screen.getByPlaceholderText('Описание'), { target: { value: 'Еда' } })
    fireEvent.click(screen.getByText('Добавить операцию'))

    expect(mockAdd).toHaveBeenCalledTimes(1)
    const addedTx = mockAdd.mock.calls[0][0]
    expect(addedTx.type).toBe('expense')
    expect(addedTx.amount).toBe(500)
    expect(addedTx.description).toBe('Еда')
    expect(addedTx.date).toBeDefined()
  })

  it('does not submit if amount is invalid', () => {
    const mockAdd = vi.fn()
    render(<TransactionForm onAdd={mockAdd} />)

    fireEvent.change(screen.getByPlaceholderText('Сумма'), { target: { value: '-10' } })
    fireEvent.change(screen.getByPlaceholderText('Описание'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByText('Добавить операцию'))

    expect(mockAdd).not.toHaveBeenCalled()
  })
})
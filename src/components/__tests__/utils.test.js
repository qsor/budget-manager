import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../utils/formatCurrency'

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1500)).toBe('1 500,00 руб.')
  })

  it('formats decimals correctly', () => {
    expect(formatCurrency(123.4)).toBe('123,40 руб.')
  })
})
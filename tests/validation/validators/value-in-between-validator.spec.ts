import { valueInBetweenValidator } from '@/validation/validators'

function makeSut(fields: Record<string, [number, number]>) {
  return valueInBetweenValidator(fields)
}

describe('valueInBetweenValidator', () => {
  it('should return a message if value is not between min and max', () => {
    const sut = makeSut({ count: [0, 10], days: [1, 30] })

    const response = sut({ count: 12, days: 0 })

    expect(response).toEqual({
      count: 'Must be in between 0 and 10',
      days: 'Must be in between 1 and 30'
    })
  })

  it('should return an empty array if value is in between min and max', () => {
    const sut = makeSut({ count: [0, 10] })

    const response = sut({ count: 8 })

    expect(response).toEqual(null)
  })
})

import { ValueInBetweenValidator } from '@/validation/validators'

function makeSut(fields: Record<string, [number, number]>) {
  const sut = new ValueInBetweenValidator(fields)

  return sut
}

describe('ValueInBetweenValidator', () => {
  it('should return a message if value is not between min and max', () => {
    const sut = makeSut({ count: [0, 10], days: [1, 30] })

    const response = sut.validate({ count: 12, days: 0 })

    expect(response).toEqual([
      'count must be in between 0 and 10',
      'days must be in between 1 and 30'
    ])
  })

  it('should return an empty array if value is in between min and max', () => {
    const sut = makeSut({ count: [0, 10] })

    const response = sut.validate({ count: 8 })

    expect(response).toEqual([])
  })
})

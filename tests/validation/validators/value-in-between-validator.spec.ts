import { valueInBetweenValidator } from '@/validation/validators'

describe('valueInBetweenValidator', () => {
  it('should return a message if value is not between min and max', () => {
    const response = valueInBetweenValidator(
      { count: 12, days: 0 },
      'count',
      [0,10]
    )

    expect(response).toEqual('Must be in between 0 and 10')
  })

  it('should return null if value is in between min and max', () => {
    const response = valueInBetweenValidator(
      { count: 8 },
      'count',
      [0, 10]
    )

    expect(response).toEqual(null)
  })
})

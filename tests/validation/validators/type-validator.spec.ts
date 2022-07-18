import { typeValidator } from '@/validation/validators/type-validator'

describe('typeValidator', () => {
  it('should return a message of invalid type', () => {
    const response = typeValidator({ str: 0 }, 'str', 'string')

    expect(response).toEqual('Must be a string')
  })

  it('should correct validate array values', () => {
    const response = typeValidator({ list: [] }, 'list', 'array')

    expect(response).toEqual(null)
  })

  it('should validate one of types passed as array', () => {
    const response = typeValidator(
      { value: 1 },
      'value',
      ['string', 'object', 'boolean']
    )

    expect(response).toEqual('Must be one of: string, object, boolean')
  })
})

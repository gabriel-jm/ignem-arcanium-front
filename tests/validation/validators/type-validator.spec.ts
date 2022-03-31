import { TypeValidator } from '@/validation/validators/type-validator'

function makeSut(fields: Record<string, string | string[]>) {
  const sut = new TypeValidator(fields)

  return sut
}

describe('TypeValidator', () => {
  it('should return an object of invalid type message', () => {
    const sut = makeSut({
      list: 'array',
      num: 'number',
      obj: 'object',
      str: 'string',
      bool: 'boolean'
    })

    const response = sut.validate({
      list: 0,
      num: NaN,
      obj: '',
      str: {},
      bool: []
    })

    expect(response).toEqual({
      list: 'Must be a array',
      num: 'Must be a number',
      obj: 'Must be a object',
      str: 'Must be a string',
      bool: 'Must be a boolean'
    })
  })

  it('should correct validate array values', () => {
    const sut = makeSut({
      list: 'array',
      num: 'number',
      obj: 'object',
      str: 'string',
      bool: 'boolean'
    })

    const response = sut.validate({
      list: [],
      num: 10,
      obj: {},
      str: 'string',
      bool: true
    })

    expect(response).toEqual(null)
  })

  it('should validate one of types passed as array', () => {
    const sut = makeSut({
      value1: ['string', 'object', 'boolean'],
      value2: ['number', 'boolean']
    })

    const response = sut.validate({
      value1: 10,
      value2: 'wrong-value'
    })

    expect(response).toEqual({
      value1: 'Must be a: string, object or boolean',
      value2: 'Must be a: number or boolean'
    })
  })
})

import { TypeValidator } from '@/validation/validators/type-validator'

function makeSut(fields: Record<string, string | string[]>) {
  const sut = new TypeValidator(fields)

  return sut
}

describe('TypeValidator', () => {
  it('should return an array of invalid type message', () => {
    const sut = makeSut({
      list: 'array',
      num: 'number',
      obj: 'object',
      str: 'string',
      bool: 'boolean'
    })

    const response = sut.validate({
      list: 0,
      num: true,
      obj: '',
      str: {},
      bool: []
    })

    expect(response).toEqual([
      'list must be a array',
      'num must be a number',
      'obj must be a object',
      'str must be a string',
      'bool must be a boolean'
    ])
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

    expect(response).toEqual([])
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

    expect(response).toEqual([
      'value1 must be a: string, object or boolean',
      'value2 must be a: number or boolean'
    ])
  })
})

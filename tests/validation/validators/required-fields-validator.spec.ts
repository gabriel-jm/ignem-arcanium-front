import { RequiredFieldsValidator } from '@/validation/validators'

function makeSut(fields: string[]) {
  return new RequiredFieldsValidator(fields)
}

describe('RequiredFieldsValidator', () => {
  it('should return an array of the missing fields', () => {
    const sut = makeSut(['field1', 'field2'])

    const response = sut.validate({
      field3: true
    })

    expect(response).toEqual({
      field1: 'Required field',
      field2: 'Required field'
    })
  })

  it('should return an empty array if all fields exists', () => {
    const sut = makeSut(['field'])

    const reponse = sut.validate({ field: true })

    expect(reponse).toEqual(null)
  })
})

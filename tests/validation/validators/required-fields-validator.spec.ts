import { requiredFieldValidator } from '@/validation/validators'

describe('requiredFieldsValidator', () => {
  it('should return an array of the missing fields', () => {
    const response = requiredFieldValidator({}, 'field')

    expect(response).toEqual('Required field')
  })

  it('should return an empty array if all fields exists', () => {
    const reponse = requiredFieldValidator({ field: true }, 'field')

    expect(reponse).toEqual(null)
  })
})

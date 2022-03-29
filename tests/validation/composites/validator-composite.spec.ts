import { ValidatorComposite } from '@/validation/composites'

describe('ValidatorComposite', () => {
  it('should not return a value on validation success', () => {
    const sut = new ValidatorComposite({
      characterName: {
        type: 'string',
        required: true
      }
    })

    const response = sut.validate({
      characterName: 'any_name'
    })

    expect(response).toEqual(null)
  })

  it('should return a list of validation errors on failure', () => {
    const sut = new ValidatorComposite({
      characterName: {
        type: 'string',
        required: true
      },
      torchCharge: {
        type: 'number',
        required: true,
        valueInBetween: [0, 6]
      }
    })

    const response = sut.validate({
      characterName: 'any_name',
      torchCharge: 10
    })

    expect(response).toEqual({
      torchCharge: 'Must be in between 0 and 6'
    })
  })
})

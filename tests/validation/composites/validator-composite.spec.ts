import { validatorComposite } from '@/validation/composites'

describe('ValidatorComposite', () => {
  it('should not return a value on validation success', () => {
    const sut = validatorComposite({
      characterName: {
        type: 'string',
        required: true
      }
    })

    const response = sut({
      characterName: 'any_name'
    })

    expect(response).toEqual(null)
  })

  it('should return a list of validation errors on failure', () => {
    const sut = validatorComposite({
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

    const response = sut({
      characterName: 'any_name',
      torchCharge: 10
    })

    expect(response).toEqual({
      torchCharge: 'Must be in between 0 and 6'
    })
  })

  it('should return the first and that only validation error by field', () => {
    const sut = validatorComposite({
      characterName: {
        required: true,
        type: 'string',
      },
      torchCount: {
        required: true,
        type: 'number'
      },
      torchCharge: {
        required: true,
        type: 'number',
        valueInBetween: [0, 6]
      },
      isLit: {
        type: 'boolean',
        required: true
      }
    })

    const response = sut({
      characterName: 0,
      torchCharge: 12
    })

    expect(response).toEqual({
      characterName: 'Must be a string',
      torchCount: 'Required field',
      torchCharge: 'Must be in between 0 and 6',
      isLit: 'Required field'
    })
  })
})

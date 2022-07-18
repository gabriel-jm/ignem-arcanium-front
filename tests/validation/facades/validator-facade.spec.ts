import { validatorFacade } from '@/validation/facades'

describe('validatorFacade', () => {
  it('should return the correct validation errors', () => {
    const validator = validatorFacade({
      field1: {
        type: 'number',
        required: true
      },
      field2: {
        type: 'string'
      },
      field3: {
        type: 'number',
        required: true,
        valueInBetween: [0, 10]
      }
    })

    const validationErrors = validator({
      field2: 10,
      field3: 12
    })

    expect(validationErrors).toEqual({
      field1: 'Required field',
      field2: 'Must be a string',
      field3: 'Must be in between 0 and 10'
    })
  })
})

import { ValidationResult } from '@/common/validation/protocols/index.js'
import {
  requiredFieldValidator,
  typeValidator,
  valueInBetweenValidator
} from '@/common/validation/validators/index.js'

const validatorsPriority: Record<string, number> = {
  type: 0,
  valueInBetween: 5,
  required: 10
}

type ValidatorsByType = Record<
  string,
  (input: any, field: string, expectedValue: any) => ValidationResult
>

const validatorsByType: ValidatorsByType = {
  type: typeValidator,
  required: requiredFieldValidator,
  valueInBetween: valueInBetweenValidator
}

export function createValidator(
  validationSchema: Record<string, Record<string, unknown>>
) {
  return (input: any) => {
    const result = new Map()

    for (const [field, validations] of Object.entries(validationSchema)) {
      const sortedValidations = Object
        .keys(validations)
        .sort((a, b) => {
          if(validatorsPriority[a] < validatorsPriority[b]) {
            return 1
          }

          if(validatorsPriority[a] > validatorsPriority[b]) {
            return -1
          }

          return 0
        })

      for (const validatorName of sortedValidations) {
        const expectedValue = validations[validatorName]
        const validationMessage = validatorsByType[validatorName](
          input,
          field,
          expectedValue
        )
  
        if (validationMessage) {
          result.set(field, validationMessage)
          break
        }
      }
    }

    return result.size
      ? Object.fromEntries(result.entries())
      : null
  }
}

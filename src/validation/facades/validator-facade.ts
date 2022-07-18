import { ValidationResult } from '@/validation/protocols'
import {
  requiredFieldValidator,
  typeValidator,
  valueInBetweenValidator
} from '@/validation/validators'

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

export function validatorFacade(
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

    return Object.fromEntries(result.entries())
  }
}

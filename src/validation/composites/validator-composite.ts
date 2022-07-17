import { Validator } from '@/validation/protocols'
import {
  requiredFieldsValidator,
  typeValidator,
  valueInBetweenValidator
} from '@/validation/validators'

const validatorsByType: Record<string, Validator['constructor']> = {
  type: typeValidator,
  required: requiredFieldsValidator,
  valueInBetween: valueInBetweenValidator
}

const validatorsPriority: Record<string, number> = {
  type: 0,
  valueInBetween: 5,
  required: 10
}

const validatorAdderByType: Record<string, Function> = {
  type: (
    validatorsFields: Record<string, any>,
    fieldName: string,
    expectedValue: unknown
  ) => {
    if (!('type' in validatorsFields)) {
      validatorsFields.type = {}
    }

    validatorsFields.type[fieldName] = expectedValue
  },
  required: (
    validatorsFields: Record<string, any>,
    fieldName: string
  ) => {
    if (!('required' in validatorsFields)) {
      validatorsFields.required = []
    }

    validatorsFields.required.push(fieldName)
  },
  valueInBetween: (
    validatorsFields: Record<string, any>,
    fieldName: string,
    expectedValue: unknown
  ) => {
    if (!('valueInBetween' in validatorsFields)) {
      validatorsFields.valueInBetween = {}
    }

    validatorsFields.valueInBetween[fieldName] = expectedValue
  }
}

export function validatorComposite(
  validationSchema: Record<string, Record<string, unknown>>
): Validator {
  const validators: Validator[] = []

  const validatorsFields: Record<string, any> = {}

  Object.entries(validationSchema).forEach(([fieldName, value]) => {
    Object
      .keys(value)
      .sort((a, b) => {
        if(validatorsPriority[a] < validatorsPriority[b]) {
          return 1
        }

        if(validatorsPriority[a] > validatorsPriority[b]) {
          return -1
        }

        return 0
      })
      .forEach(validatorType => {
        const expectedValue = value[validatorType]

        validatorAdderByType[validatorType]?.(
          validatorsFields,
          fieldName,
          expectedValue
        )
      })
  })

  console.log(validators, validatorsFields)

  Object.entries(validatorsFields).forEach(([validatorType, params]) => {
    const validatorFactory = Reflect.get(validatorsByType, validatorType)
    const validator = validatorFactory(params)
    
    validators.push(validator)
  })
  
  return (input: any) => {
    const validatiorsResult = validators.reduce((acc, validator) => {
      const validationResult = validator(input)

      if (!validationResult) return { ...acc }

      const filteredValidationResult = Object
        .entries(validationResult)
        .reduce((accumulator, [key, value]) => {
          if (!(key in acc)) {
            return { ...accumulator, [key]: value }
          }

          return accumulator
        }, {})

      return { ...acc, ...filteredValidationResult }
    }, {})

    if (!Object.keys(validatiorsResult).length) return null

    return validatiorsResult
  }
}

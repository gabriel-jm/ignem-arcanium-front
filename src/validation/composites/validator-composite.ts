import { Validator } from '@/validation/protocols'
import {
  RequiredFieldsValidator,
  TypeValidator,
  ValueInBetweenValidator
} from '@/validation/validators'

export class ValidatorComposite implements Validator {
  #validatorsByType: Record<string, Validator['constructor']> = {
    type: TypeValidator,
    required: RequiredFieldsValidator,
    valueInBetween: ValueInBetweenValidator
  }
  #validatorAdderByType: Record<string, Function> = {
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
  #validators: Validator[] = []

  constructor (private readonly validationSchema: Record<string, Record<string, unknown>>) {
    this.buildValidators()
  }

  buildValidators() {
    const validatorsFields: Record<string, any> = {}

    Object.entries(this.validationSchema).forEach(([fieldName, value]) => {
      Object.entries(value).forEach(([validatorType, expectedValue]) => {
        this.#validatorAdderByType[validatorType]?.(
          validatorsFields,
          fieldName,
          expectedValue
        )
      })
    })

    Object.entries(validatorsFields).forEach(([validatorType, params]) => {
      const validator = Reflect.construct(
        this.#validatorsByType[validatorType],
        [params]
      )
      
      this.#validators.push(validator)
    })
  }
  
  validate(input: any) {
    const validatiorsResult = this.#validators.reduce((acc, validator) => {
      const validationResult = validator.validate(input)

      if (!validationResult) return acc

      return { ...acc, ...validationResult }
    }, {})

    if (!Object.keys(validatiorsResult).length) return null

    return validatiorsResult
  }
}

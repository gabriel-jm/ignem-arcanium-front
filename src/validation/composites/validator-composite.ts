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
  #validators: Validator[] = []

  constructor (private readonly validationSchema: Record<string, Record<string, unknown>>) {
    this.buildValidators()
  }

  buildValidators() {
    const validatorsFields: Record<string, any> = {}

    Object.entries(this.validationSchema).forEach(([fieldName, value]) => {
      Object.entries(value).forEach(([validatorType, expectedValue]) => {
        if (validatorType === 'type') {
          if (!(validatorType in validatorsFields)) {
            validatorsFields.type = {}
          }

          validatorsFields.type[fieldName] = expectedValue
        }

        if (expectedValue && validatorType === 'required') {
          if (!(validatorType in validatorsFields)) {
            validatorsFields.required = []
          }

          validatorsFields.required.push(fieldName)
        }

        if (validatorType === 'valueInBetween') {
          if (!(validatorType in validatorsFields)) {
            validatorsFields.valueInBetween = {}
          }

          validatorsFields.valueInBetween[fieldName] = expectedValue
        }
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
  
  validate(input: any): string[] {
    const validationsResults = this.#validators.map(validator => {
      return validator.validate(input)
    })

    return validationsResults.flat()
  }
}

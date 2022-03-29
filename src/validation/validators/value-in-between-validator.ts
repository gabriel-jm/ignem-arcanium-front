import { Validator } from '@/validation/protocols'

export class ValueInBetweenValidator implements Validator {
  constructor(
    private readonly fields: Record<string, [number, number]>
  ) {}
  
  validate(input: any) {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const [min, max] = this.fields[field]
      const value = input[field]
      const isInBetween = value >= min && value <= max

      return !isInBetween
    })

    if (!invalidFields.length) return null

    return invalidFields.reduce((acc, field) => {
      const [min, max] = this.fields[field]
      const message = `Must be in between ${min} and ${max}`

      return { ...acc, [field]: message }
    }, {})
  }
}

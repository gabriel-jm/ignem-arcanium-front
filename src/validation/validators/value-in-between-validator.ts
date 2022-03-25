import { Validator } from '@/validation/protocols'

export class ValueInBetweenValidator implements Validator {
  constructor(
    private readonly fields: Record<string, [number, number]>
  ) {}
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const [min, max] = this.fields[field]
      const value = input[field]
      const isInBetween = value >= min && value <= max

      return !isInBetween
    })

    return invalidFields.map(field => {
      const [min, max] = this.fields[field]
      return `${field} must be in between ${min} and ${max}`
    })
  }
}

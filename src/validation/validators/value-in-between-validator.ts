import { Validator } from '@/validation/protocols'

export function valueInBetweenValidator(
  fields: Record<string, [number, number]>
) : Validator {
  return (input: any) => {
    const invalidFields = Object.keys(fields).filter(field => {
      const [min, max] = fields[field]
      const value = input[field]
      const isInBetween = value >= min && value <= max

      return !isInBetween
    })

    if (!invalidFields.length) return null

    return invalidFields.reduce((acc, field) => {
      const [min, max] = fields[field]
      const message = `Must be in between ${min} and ${max}`

      return { ...acc, [field]: message }
    }, {})
  }
}

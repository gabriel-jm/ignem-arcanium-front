import { Validator } from '@/validation/protocols'

export function requiredFieldsValidator(fields: string[]): Validator {
  return (input: any) => {
    const missingFields = fields.filter(field => {
      const inputValue = input[field]

      return inputValue === null
        || inputValue === undefined
        || inputValue === ''
    })

    if (!missingFields.length) return null
    
    return missingFields.reduce((acc, fieldName) => {
      return { ... acc, [fieldName]: 'Required field' }
    }, {})
  }
}

import { Validator } from '@/validation/protocols'

export class RequiredFieldsValidator implements Validator {
  constructor(private readonly fields: string[]) {}
  
  validate(input: any) {
    const missingFields = this.fields.filter(field => {
      return !(field in input)
    })

    if (!missingFields.length) return null
    
    return missingFields.reduce((acc, fieldName) => {
      return { ... acc, [fieldName]: 'Required field' }
    }, {})
  }
}
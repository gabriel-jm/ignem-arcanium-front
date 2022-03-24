import { Validator } from '@/validation/protocols'

export class RequiredFieldsValidator implements Validator {
  constructor(private readonly fields: string[]) {}
  
  validate(input: any): string[] {
    const missingFields = this.fields.filter(field => {
      return !(field in input)
    })
    
    return missingFields.map(field => `${field} is required`)
  }
}
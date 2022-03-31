import { Validator } from '@/validation/protocols'

export class TypeValidator implements Validator {
  constructor(private readonly fields: Record<string, string | string[]>) {}

  getType(value: any) {
    const valueType = typeof value

    if (valueType === 'number' && isNaN(value)) {
      return 'NaN'
    }

    return valueType
  }
  
  validate(input: any) {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const value = input[field]
      const fieldValue = this.fields[field]
      const types = !Array.isArray(fieldValue) ? [fieldValue] : fieldValue

      const isInvalid = types.every(type => {
        if (type === 'array') {
          return !Array.isArray(value)
        }
  
        return !(this.getType(value) === type)
      })

      return isInvalid
    })

    if (!invalidFields.length) return null

    return invalidFields.reduce((acc, field) => {
      const fieldValue = this.fields[field]
      const isArray = Array.isArray(fieldValue)
      const types = !isArray ? fieldValue : fieldValue.reduce((acc, value, index, arr) => {
        return acc + (index ? (index + 1 === arr.length ? ' or ' : ', ') : '') + value
      }, '')

      const message = `Must be ${isArray ? 'a:' : 'a'} ${types}`

      return { ...acc, [field]: message }
    }, {})
  }
}

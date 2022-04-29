import { Validator } from '@/validation/protocols'

function getType(value: any) {
  const valueType = typeof value

  if (valueType === 'number' && isNaN(value)) {
    return 'NaN'
  }

  return valueType
}

export function typeValidator(fields: Record<string, string | string[]>) : Validator {
  return (input: any) => {
    const invalidFields = Object.keys(fields).filter(field => {
      const value = input[field]
      const fieldValue = fields[field]
      const types = !Array.isArray(fieldValue) ? [fieldValue] : fieldValue

      const isInvalid = types.every(type => {
        if (type === 'array') {
          return !Array.isArray(value)
        }
  
        return !(getType(value) === type)
      })

      return isInvalid
    })

    if (!invalidFields.length) return null

    return invalidFields.reduce((acc, field) => {
      const fieldValue = fields[field]
      const isArray = Array.isArray(fieldValue)
      const types = !isArray ? fieldValue : fieldValue.reduce((acc, value, index, arr) => {
        return acc + (index ? (index + 1 === arr.length ? ' or ' : ', ') : '') + value
      }, '')

      const message = `Must be ${isArray ? 'a:' : 'a'} ${types}`

      return { ...acc, [field]: message }
    }, {})
  }
}

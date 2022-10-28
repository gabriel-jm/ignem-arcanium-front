import { Validator } from '@/validation/protocols'

function getType(value: any) {
  const valueType = typeof value

  if (valueType === 'number' && isNaN(value)) {
    return 'NaN'
  }

  return valueType
}

export const typeValidator: Validator = (
  input: any,
  field: string,
  types: string | string[]
) => {
  const inputValue = Reflect.get(input, field)

  if (!inputValue) return null

  const isArray = Array.isArray(types)
  const typeList = isArray ? types : [types]

  const typeOfValue = getType(inputValue)

  const hasAllowedType = typeList.some(type => {
    if (type === 'array') {
      return Array.isArray(inputValue)
    }

    return typeOfValue === type
  })

  return hasAllowedType ? null : `Must be ${isArray ? 'one of:' : 'a'} ${typeList.join(', ')}`
}

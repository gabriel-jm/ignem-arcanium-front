import { Validator } from '@/common/validation/protocols/index.js'

export const requiredFieldValidator: Validator = (
  input: any, field: string
) => {
  const inputValue = Reflect.get(input, field)

  const isValueMissing = inputValue === null
    || inputValue === undefined
    || inputValue === ''

  return isValueMissing ? 'Required field' : null
}

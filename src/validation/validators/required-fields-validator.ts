import { Validator } from '@/validation/protocols'

export const requiredFieldsValidator: Validator<string> = (
  input: any, field: string
) => {
  const inputValue = Reflect.get(input, field)

  const isValueMissing = inputValue === null
    || inputValue === undefined
    || inputValue === ''

  return isValueMissing ? { [field]: 'Required field' } : null
}

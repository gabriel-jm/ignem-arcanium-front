import { Validator } from '@/validation/protocols/index.js'

export const valueInBetweenValidator: Validator = (
  input: any,
  field: string,
  values: [number, number]
) => {
  const [min, max] = values
  const inputValue = Reflect.get(input, field)

  const isInBetween = inputValue >= min && inputValue <= max

  return isInBetween ? null : `Must be in between ${min} and ${max}`
}

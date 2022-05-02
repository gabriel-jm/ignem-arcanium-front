import { ValidationResult } from '@/validation/protocols'

export function mockValidator() {
  return vi.fn<[], ValidationResult>(() => null)
}

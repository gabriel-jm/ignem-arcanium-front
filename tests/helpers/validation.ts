import { ValidationResult } from '@/validation/protocols'

export function mockValidator() {
  return {
    result: null,
    validate: vi.fn<[], ValidationResult>(() => null)
  }
}

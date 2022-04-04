export function mockValidator() {
  return {
    result: null,
    validate: vi.fn(() => null)
  }
}

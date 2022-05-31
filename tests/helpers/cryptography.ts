export function mockTokenDecoder() {
  const result = {}

  return {
    result,
    decode: vi.fn<any, any>(() => result)
  }
}

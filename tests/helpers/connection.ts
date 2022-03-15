export function mockCreateConnection() {
  return {
    result: true,
    create: vi.fn(() => Promise.resolve(true))
  }
}

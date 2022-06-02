export function mockCacheStore() {
  return {
    get: vi.fn(),
    save: vi.fn(),
    remove: vi.fn()
  }
}

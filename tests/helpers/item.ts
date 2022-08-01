export function fakeItem() {
  return {
    id: 'any_id',
    name: 'any_name',
    type: 'any_type',
    description: 'any_description',
    rarity: 'any_rarity'
  }
}

export function mockListAllDefaultItemsService() {
  const result = [fakeItem()]

  return {
    result,
    listAllDefault: vi.fn(() => Promise.resolve(result))
  }
}

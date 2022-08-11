export function fakeItem() {
  return {
    id: 'any_id',
    name: 'any_name',
    type: 'any_type',
    description: 'any_description',
    rarity: 'any_rarity',
    weight: 1,
    price: 1
  }
}

export function mockListAllDefaultItemsService() {
  const result = [fakeItem()]

  return {
    result,
    listAllDefault: vi.fn(() => Promise.resolve(result))
  }
}

export function mockListAllDefaultItems() {
  const result = [fakeItem()]

  return {
    result,
    listAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockSetItemsStore() {
  return {
    setItemsValue: null,
    set items(value: any) {
      this.setItemsValue = value
    }
  }
}

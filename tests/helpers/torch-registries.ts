export const mockTorchRegistry = () => ({
  id: 'any_id',
  characterName: 'any_character_name',
  torchCount: 1,
  torchCharge: 3,
  isLit: true
})

export function mockFindAllTorchRegistriesService() {
  const result = [mockTorchRegistry()]
  
  return {
    result,
    findAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockFindAllTorchRegistries() {
  const result = [mockTorchRegistry()]
  
  return {
    result,
    findAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCreateTorchRegistryService() {
  return {
    result: 'any_torch_registry_id',
    create: vi.fn(() => Promise.resolve('any_torch_registry_id'))
  }
}

export function mockCreateTorchRegistry() {
  return {
    result: 'any_id',
    create: vi.fn(() => Promise.resolve('any_id'))
  }
}

export function mockUpdateTorchRegistryService() {
  return {
    update: vi.fn(() => Promise.resolve())
  }
}

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
    findAll: jest.fn(() => Promise.resolve(result))
  }
}

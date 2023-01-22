export function fakeCharacter() {
  return {
    id: 'any_id',
    name: 'any_name',
    icon: 'any_icon',
    level: 1,
    gold: 10,
    hp: 12,
    mp: 11,
    alignment: 'any_alignment',
    characterPoints: 0,
    strength: 1,
    dexterity: 2,
    constitution: 3,
    intelligence: 4,
    wisdom: 5,
    charisma: 6,
    equipment: {},
    inventory: {
      id: 'any_inventory_id',
      size: 200,
      spaceInUse: 100,
      items: []
    }
  }
}

export function mockFindAllCharactersService() {
  const result = [fakeCharacter()]

  return {
    result,
    findAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockFindAllCharacters() {
  const result = [{
    ...fakeCharacter()
  }]

  return {
    result,
    findAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCreateCharacterService() {
  const result = { id: 'any_id' }

  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCreateCharacter() {
  const result = fakeCharacter()

  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

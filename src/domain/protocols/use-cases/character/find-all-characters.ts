export interface FindAllCharactersResult {
  id: string
  name: string
  icon: string
  level: number
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export interface FindAllCharacters {
  findAll(): Promise<FindAllCharactersResult[]>
}

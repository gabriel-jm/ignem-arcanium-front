export interface FindAllCharactersServiceResult {
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
  charism: number
}

export interface FindAllCharactersService {
  findAll(): Promise<FindAllCharactersServiceResult[]>
}

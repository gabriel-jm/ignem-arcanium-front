import { FindAllCharactersResult } from '../../../domain/protocols/use-cases/character/find-all-characters.js'

export type FindAllCharactersServiceResult = FindAllCharactersResult

export interface FindAllCharactersService {
  findAll(): Promise<FindAllCharactersServiceResult[]>
}

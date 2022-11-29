import { FindAllCharactersResult } from '@/domain/protocols/use-cases'

export type FindAllCharactersServiceResult = FindAllCharactersResult

export interface FindAllCharactersService {
  findAll(): Promise<FindAllCharactersServiceResult[]>
}

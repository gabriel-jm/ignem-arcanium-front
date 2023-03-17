import { FindAllCharactersService } from '@/domain/protocols/services/index.js'
import { FindAllCharacters, FindAllCharactersResult } from '@/domain/protocols/use-cases/index.js'

export class RemoteFindAllCharacters implements FindAllCharacters {
  constructor(private readonly findAllCharactersService: FindAllCharactersService) {}
  
  async findAll(): Promise<FindAllCharactersResult[]> {
    const characters = await this.findAllCharactersService.findAll()

    return characters
  }
}

import { FindAllCharactersService } from '@/domain/protocols/services'
import { FindAllCharacters, FindAllCharactersResult } from '@/domain/protocols/use-cases'

export class RemoteFindAllCharacters implements FindAllCharacters {
  constructor(private readonly findAllCharactersService: FindAllCharactersService) {}
  
  async findAll(): Promise<FindAllCharactersResult[]> {
    const characters = await this.findAllCharactersService.findAll()

    return characters
  }
}

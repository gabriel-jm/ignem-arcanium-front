import { RemoteFindAllCharacters } from '@/domain/use-cases'
import { mockFindAllCharactersService } from '@/tests/helpers'

function makeSut() {
  const findAllCharactersServiceSpy = mockFindAllCharactersService()
  const sut = new RemoteFindAllCharacters(findAllCharactersServiceSpy)
  
  return {
    sut,
    findAllCharactersServiceSpy
  }
}

describe('RemoteFindAllCharacters', () => {
  it('should call FindAllCharactersService with correct values', async () => {
    const { sut, findAllCharactersServiceSpy } = makeSut()

    await sut.findAll()

    expect(findAllCharactersServiceSpy.findAll).toHaveBeenCalledWith()
  })

  it('should return the list of characters on success', async () => {
    const { sut, findAllCharactersServiceSpy } = makeSut()

    const response = await sut.findAll()

    expect(response).toEqual(findAllCharactersServiceSpy.result)
  })
})

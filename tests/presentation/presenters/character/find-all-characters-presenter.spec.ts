import { successResponse } from '@/presentation/helpers'
import { FindAllCharactersPresenter } from '@/presentation/presenters'
import { mockFindAllCharacters } from '@/tests/helpers'

function makeSut() {
  const findAllCharactersSpy = mockFindAllCharacters()
  const sut = new FindAllCharactersPresenter(findAllCharactersSpy)

  return {
    sut,
    findAllCharactersSpy
  }
}

describe('FindAllCharactersPresenter', () => {
  it('should call FindAllCharacters with correct values', async () => {
    const { sut, findAllCharactersSpy } = makeSut()

    await sut.handle()

    expect(findAllCharactersSpy.findAll).toHaveBeenCalledWith()
  })

  it('should return a success response with the characters list', async () => {
    const { sut, findAllCharactersSpy } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(successResponse(findAllCharactersSpy.result))
  })
})

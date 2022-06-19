import { RemoteCreateCharacter } from '@/domain/use-cases'
import { fakeCharacter, mockCreateCharacterService } from '@/tests/helpers'

function makeSut() {
  const createCharacterServiceSpy = mockCreateCharacterService()
  const sut = new RemoteCreateCharacter(createCharacterServiceSpy)

  return {
    sut,
    createCharacterServiceSpy
  }
}

describe('RemoteCreateCharacter', () => {
  const { id, ...createCharacterParams } = fakeCharacter()

  it('should call CreateCharacterService with correct values', async () => {
    const { sut, createCharacterServiceSpy } = makeSut()

    await sut.create(createCharacterParams)

    expect(createCharacterServiceSpy.create).toHaveBeenCalledWith(createCharacterParams)
  })

  it('should return the created character values and id on success', async () => {
    const { sut } = makeSut()

    const response = await sut.create(createCharacterParams)

    expect(response).toEqual(fakeCharacter())
  })
})

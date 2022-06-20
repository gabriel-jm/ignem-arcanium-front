import { successResponse } from '@/presentation/helpers'
import { CreateCharacterPresenter } from '@/presentation/presenters'
import { fakeCharacter, mockCreateCharacter } from '@/tests/helpers'

function makeSut() {
  const createCharacterSpy = mockCreateCharacter()
  const sut = new CreateCharacterPresenter(createCharacterSpy)

  return {
    sut,
    createCharacterSpy
  }
}

describe('CreateCharacterPresenter', () => {
  const { id, icon, ...createCharacterParams } = fakeCharacter()

  it('should call CreateCharacter with correct values', async () => {
    const { sut, createCharacterSpy } = makeSut()

    await sut.handle(createCharacterParams)

    expect(createCharacterSpy.create).toHaveBeenCalledWith({
      ...createCharacterParams,
      icon: '/mage.svg'
    })
  })

  it('should return the created character on success', async () => {
    const { sut, createCharacterSpy } = makeSut()

    const response = await sut.handle(createCharacterParams)

    expect(response).toEqual(successResponse(createCharacterSpy.result))
  })
})

import { RemoteListAllDefaultItems } from '@/domain/use-cases'
import { mockListAllDefaultItemsService } from '@/tests/helpers'

function makeSut() {
  const listAllDefaultItemsServiceSpy = mockListAllDefaultItemsService()
  const sut = new RemoteListAllDefaultItems(listAllDefaultItemsServiceSpy)

  return {
    sut,
    listAllDefaultItemsServiceSpy
  }
}

describe('RemoteListAllDefaultItems', () => {
  it('should call ListAllDefaultItemsService with correct values', async () => {
    const { sut, listAllDefaultItemsServiceSpy } = makeSut()

    await sut.listAll()

    expect(listAllDefaultItemsServiceSpy.listAllDefault).toHaveBeenCalledWith()
  })

  it('should return the default items on success', async () => {
    const { sut, listAllDefaultItemsServiceSpy } = makeSut()

    const result = await sut.listAll()

    expect(result).toEqual(listAllDefaultItemsServiceSpy.result)
  })
})

import { successResponse } from '@/presentation/helpers'
import { ListAllDefaultItemsPresenter } from '@/presentation/presenters'
import { mockListAllDefaultItems, mockSetItemsStore } from '@/tests/helpers'

function makeSut() {
  const listAllDefaultItemsSpy = mockListAllDefaultItems()
  const setItemsStoreSpy = mockSetItemsStore()
  const sut = new ListAllDefaultItemsPresenter(listAllDefaultItemsSpy, setItemsStoreSpy)

  return {
    sut,
    listAllDefaultItemsSpy,
    setItemsStoreSpy
  }
}

describe('ListAllDefaultItemsPresenter', () => {
  it('should call ListAllDefaultItems usecase with correct values', async () => {
    const { sut, listAllDefaultItemsSpy } = makeSut()

    await sut.handle()

    expect(listAllDefaultItemsSpy.listAll).toHaveBeenCalledWith()
  })

  it('should call SetItemsStore with correct values', async () => {
    const { sut, setItemsStoreSpy, listAllDefaultItemsSpy } = makeSut()

    await sut.handle()

    expect(setItemsStoreSpy.setItemsValue).toEqual(listAllDefaultItemsSpy.result)
  })

  it('should return an empty success response', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result).toEqual(successResponse(null))
  })
})

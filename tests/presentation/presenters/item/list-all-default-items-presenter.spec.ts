import { successResponse } from '@/presentation/helpers'
import { ListAllDefaultItemsPresenter } from '@/item/application'
import { mockHTTPClient, mockSetItemsStore } from '@/tests/helpers'

function makeSut() {
  const httpClientSpy = mockHTTPClient()
  const setItemsStoreSpy = mockSetItemsStore()
  const sut = new ListAllDefaultItemsPresenter(httpClientSpy, setItemsStoreSpy)

  return {
    sut,
    httpClientSpy,
    setItemsStoreSpy
  }
}

describe('ListAllDefaultItemsPresenter', () => {
  it('should call ListAllDefaultItems usecase with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.handle()

    expect(httpClientSpy.request).toHaveBeenCalledWith()
  })

  it('should call SetItemsStore with correct values', async () => {
    const { sut, setItemsStoreSpy, httpClientSpy } = makeSut()

    await sut.handle()

    expect(setItemsStoreSpy.setItemsValue).toEqual(httpClientSpy.result)
  })

  it('should return an empty success response', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result).toEqual(successResponse(null))
  })
})

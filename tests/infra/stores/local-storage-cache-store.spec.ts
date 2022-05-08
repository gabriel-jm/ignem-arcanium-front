import { LocalStorageCacheStore } from '@/infra/stores'

function makeSut() {
  const setItemSpy = vi.spyOn(localStorage, 'setItem')
  const sut = new LocalStorageCacheStore()

  return {
    sut,
    setItemSpy
  }
}

describe('LocalStorageCacheStore', () => {
  it('should call localStorage.setItem with correct values', async () => {
    const { sut, setItemSpy } = makeSut()

    sut.save('any_key', { data: 1 })

    expect(setItemSpy).toHaveBeenCalledWith(
      '@ignem-arcanium:any_key',
      '{"data":1}'
    )
  })
})

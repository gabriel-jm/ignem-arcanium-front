import { successResponse } from '@/presentation/helpers'
import { LogoutPresenter } from '@/presentation/presenters'
import { mockAccountLogout, mockRouter, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const accountLogoutSpy = mockAccountLogout()
  const setAccountStoreSpy = mockSetAccountStore()
  const routerSpy = mockRouter()
  const sut = new LogoutPresenter(
    accountLogoutSpy,
    setAccountStoreSpy,
    routerSpy
  )

  return {
    sut,
    accountLogoutSpy,
    setAccountStoreSpy,
    routerSpy
  }
}

describe('LogoutPresenter', () => {
  it('should call AccountLogout with correct values', async () => {
    const { sut, accountLogoutSpy } = makeSut()

    await sut.handle()

    expect(accountLogoutSpy.logout).toHaveBeenCalledWith()
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, setAccountStoreSpy } = makeSut()

    await sut.handle()

    expect(setAccountStoreSpy.setAccountValue).toBeNull()
  })

  it('should call Router with correct values', async () => {
    const { sut, routerSpy } = makeSut()

    await sut.handle()

    expect(routerSpy.navigate).toHaveBeenCalledWith('/login')
  })

  it('should return an empty success response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(successResponse(null))
  })
})

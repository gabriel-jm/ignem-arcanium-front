export function mockCreateAccount() {
  const result = {
    name: 'any_name',
    token: 'any_token'
  }
  
  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCreateAccountService() {
  const result = {
    name: 'any_name',
    token: 'any_token'
  }
  
  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}

export function mockAccountLoginService() {
  const result = {
    name: 'any_name',
    token: 'any_token'
  }
  
  return {
    result,
    login: vi.fn(() => Promise.resolve(result))
  }
}

export function mockAccountLogin() {
  const result = {
    name: 'any_name'
  }
  
  return {
    result,
    login: vi.fn(() => Promise.resolve(result))
  }
}

export function mockVerifyTokenService() {
  return {
    verify: vi.fn(() => Promise.resolve())
  }
}

export function mockVerifyToken() {
  const result = {
    id: 'any_id',
    name: 'any_name'
  }

  return {
    result,
    verify: vi.fn(() => Promise.resolve(result))
  }
}

export function mockSetAccountStore() {
  return {
    setAccountValue: null,
    set account(value: any) {
      this.setAccountValue = value
    }
  }
}

export function mockAccountLogout() {
  return {
    logout: vi.fn(() => Promise.resolve())
  }
}

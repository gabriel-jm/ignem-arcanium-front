export function mockCreateAccount() {
  return {
    result: { accountId: 'any_account_id' },
    create: vi.fn(() => Promise.resolve({ accountId: 'any_account_id' }))
  }
}

export function mockCreateAccountService() {
  return {
    result: { accountId: 'any_account_id' },
    create: vi.fn(() => Promise.resolve({ accountId: 'any_account_id' }))
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

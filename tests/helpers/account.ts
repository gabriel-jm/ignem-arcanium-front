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
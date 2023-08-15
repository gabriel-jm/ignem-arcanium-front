export class AuthenticationError extends Error {
  type = 'Auth'

  constructor() {
    super('Authentication Error')
  }
}

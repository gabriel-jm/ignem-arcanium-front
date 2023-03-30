export class InvalidTokenError extends Error {
  constructor() {
    super('Access denied, please log in')
  }
}

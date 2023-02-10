export class UnauthorizedError extends Error {
  type = 'Authorization'

  constructor() {
    super('Access unauthorized')
  }
}

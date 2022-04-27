export class ServiceError extends Error {
  constructor(
    public readonly data: unknown,
    public readonly message = 'Service response error'
  ) {
    super(message)
  }
}

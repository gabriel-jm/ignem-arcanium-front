interface ServiceData {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: unknown
}

export class ServiceError extends Error {
  constructor(
    public readonly data: ServiceData,
    public readonly message = 'Service response error'
  ) {
    super(message)
  }
}

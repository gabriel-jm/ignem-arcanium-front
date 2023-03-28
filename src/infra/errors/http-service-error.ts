import { ErrorResponse, HTTPResponse } from '@/common/infra/protocols/index.js'

export class HTTPServiceError extends Error {
  constructor(
    public readonly data: HTTPResponse<unknown>,
    fallbackMessage = 'Service response error',
    public readonly skipNotification = false
  ) {
    const errorResponse = data.body as ErrorResponse
    let message = errorResponse.error?.details[0]

    if (data.statusCode >= 500) {
      message = fallbackMessage
    }

    super(message)
  }
}

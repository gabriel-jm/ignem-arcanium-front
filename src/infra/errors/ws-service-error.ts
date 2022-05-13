import { ErrorResponse, MessageOnceListenerPayload } from '@/infra/protocols'

export class WsServiceError extends Error {
  constructor(
    public readonly payload: MessageOnceListenerPayload<unknown>,
    fallbackMessage = 'Service response error',
    public readonly skipNotification = false
  ) {
    const errorResponse = payload.data as ErrorResponse
    let message = errorResponse.error?.details[0]

    if (payload.statusCode >= 500) {
      message = fallbackMessage
    }

    super(message)
  }
}

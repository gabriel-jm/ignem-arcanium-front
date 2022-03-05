export interface MessageOnceListenerPayload {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: unknown
}

export type MessageOnceListener = (payload: MessageOnceListenerPayload) => void

export interface AddMessageListenerOnceStore {
  once(eventName: string, listener: MessageOnceListener): void
}

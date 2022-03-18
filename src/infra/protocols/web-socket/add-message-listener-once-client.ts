export interface MessageOnceListenerPayload {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: unknown
}

export type MessageOnceListener = (payload: MessageOnceListenerPayload) => void

export interface AddMessageListenerOnceClient {
  once(eventName: string, listener: MessageOnceListener): Promise<void>
}

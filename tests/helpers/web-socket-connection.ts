import { MessageOnceListenerPayload } from '@/infra/protocols'

export function mockSendMessageStore() {
  return {
    send: vi.fn()
  }
}

export function mockAddMessageListenerOnceStore(event: MessageOnceListenerPayload) {
  return {
    result: event,
    once: vi.fn((_eventName, listener) => {
      listener(event)
    })
  }
}

import { events } from './handle-events'

const connectionDataStore = {
  connectionId: <string | null> null,
  events: {
    change: <Array<(newValue: string | null) => void>> []
  }
}

export class ConnectionStore {
  get connectionId() {
    return connectionDataStore.connectionId
  }

  set connectionId(value: string | null) {
    connectionDataStore.connectionId = value

    for (const changeListener of connectionDataStore.events.change) {
      changeListener(value)
    }
  }

  on(eventName: 'change', listener: (newValue: string | null) => void) {
    if (eventName in connectionDataStore.events) {
      connectionDataStore.events[eventName].push(listener)
    }
  }
}

const wsConnection = new WebSocket('ws://localhost:8000/ws')

wsConnection.addEventListener('open', () => {
  console.log('%cConnection Stablished!', 'color: #4d5;')
})

wsConnection.addEventListener('error', () => {
  console.log('Error on connection')
})

wsConnection.addEventListener('close', () => {
  console.log('Connection Closed!')
})

wsConnection.addEventListener('message', ev => {
  const messageData = JSON.parse(ev.data)

  const eventName = String(messageData.event)
  const handler = events[eventName]

  if (handler) {
    return handler(messageData)
  }

  console.log(`No handler for ${messageData.event} event`)
})

document.querySelector('button')?.addEventListener('click', () => {
  const { connectionId } = new ConnectionStore()

  wsConnection.send(JSON.stringify({
    event: 'create-torch-registry',
    headers: { connectionId },
    data: null
  }))
})

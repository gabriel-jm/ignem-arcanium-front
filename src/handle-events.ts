import { ConnectionStore } from './main'

export const events = {
  'accept-connection': (messageData: any) => {
    const connectionStore = new ConnectionStore()
    connectionStore.connectionId = messageData.headers.connectionId
    console.log('ConnectionId', connectionStore.connectionId)
  }
}

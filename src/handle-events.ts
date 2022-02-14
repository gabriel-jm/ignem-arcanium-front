import { ConnectionStore } from './main'

function createLi(content: string) {
  const li = document.createElement('li')
  li.innerText = content

  return li
}

export const events: Record<string, ((messageData: any) => void | undefined)> = {
  'accept-connection': messageData => {
    const connectionStore = new ConnectionStore()
    connectionStore.connectionId = messageData.headers.connectionId
    console.log('ConnectionId', connectionStore.connectionId)
  },
  'create-torch-registry-response': messageData => {
    const ul = document.createElement('ul')

    Object.keys(messageData.data).forEach(key => {
      ul.append(createLi(`${key}: ${messageData.data[key]}`))
    })

    document.body.append(ul)
  }
}

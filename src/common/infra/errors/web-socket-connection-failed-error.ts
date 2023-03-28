export class WebSocketConnectionFailedError extends Error {
  type = 'Infra'

  constructor() {
    super('Cannot stablish a connection with the server')
  }
}

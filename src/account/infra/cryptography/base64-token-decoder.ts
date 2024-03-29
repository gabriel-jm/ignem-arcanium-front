import { TokenDecoder } from '@/account/application/protocols/token-decoder.js'

export class Base64TokenDecoder implements TokenDecoder {
  decode(token: string) {
    try {
      const base64Text = token.split('.')[1]
      const jsonData = window.atob(base64Text)
      const data = JSON.parse(jsonData)
      
      return data
    } catch {
      return null
    }
  }
}

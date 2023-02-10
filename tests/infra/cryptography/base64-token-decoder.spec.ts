import { Base64TokenDecoder } from '@/account/infra/cryptography'

const makeSut = () => new Base64TokenDecoder()

describe('Base64TokenDecoder', () => {
  it('should decode a json and return it parsed', () => {
    const json = '{"data":1}'
    const base64 = window.btoa(json)
    const token = `kjhsfd.${base64}.kjsdk`
    
    const sut = makeSut()

    const response = sut.decode(token)

    expect(response).toEqual({ data: 1 })
  })

  it('should return null on any error', () => {
    const sut = makeSut()

    const response = sut.decode('any_token')

    expect(response).toBeNull()
  })
})

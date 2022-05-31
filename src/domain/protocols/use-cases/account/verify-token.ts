export interface VerifyTokenResult {
  id: string
  name: string
}

export interface VerifyToken {
  verify(): Promise<VerifyTokenResult>
}

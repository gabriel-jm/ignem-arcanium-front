export interface VerifyTokenService {
  verify(token: string): Promise<void>
}

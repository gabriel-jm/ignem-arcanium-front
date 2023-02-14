export interface TokenDecoder {
  decode<T = unknown>(token: string): T
}

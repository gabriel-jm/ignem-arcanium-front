export interface HTTPRequest {
  method: string
  path: string
  headers?: Record<string, string>
  body?: unknown
}

export interface HTTPResponse<T> {
  statusCode: number
  body: T
}

export interface HTTPClient {
  request<T = unknown>(params: HTTPRequest): Promise<HTTPResponse<T>>
}

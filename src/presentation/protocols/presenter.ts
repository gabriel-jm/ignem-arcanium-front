export interface PresenterResult<T = any> {
  ok: boolean
  data: T
  validationErrors: Record<string, string> | null
}

export interface Presenter {
  handle<T = any>(data?: unknown): Promise<PresenterResult<T>>
}

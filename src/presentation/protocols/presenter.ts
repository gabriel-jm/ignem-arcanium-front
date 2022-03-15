export interface PresenterResult<T = unknown> {
  ok: boolean
  data: T | null
  validationErrors: Record<string, string>[] | null
}

export interface Presenter {
  handle(data?: unknown): Promise<PresenterResult>
}

export interface ControllerResult<T = unknown> {
  ok: boolean
  data: T | null
  validationErrors: Record<string, string>[] | null
}

export interface Controller {
  handle(data?: unknown): Promise<ControllerResult>
}

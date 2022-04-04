import { successResponse } from '@/presentation/helpers'

export function mockPresenter() {
  const result = successResponse(null)

  return {
    result,
    handle: vi.fn(() => Promise.resolve(result))
  }
}
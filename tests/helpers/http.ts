export function mockHTTPClient(responseBody: any = null) {
  const result = {
    statusCode: 200,
    body: responseBody
  }

  return {
    result,
    request: vi.fn(() => Promise.resolve(result))
  }
}

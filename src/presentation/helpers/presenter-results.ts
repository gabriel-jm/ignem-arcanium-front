export function successResponse(data: any) {
  return {
    ok: true,
    data,
    validationErrors: null
  }
}

export function failureResponse(data: any) {
  return {
    ok: false,
    data,
    validationErrors: null
  }
}

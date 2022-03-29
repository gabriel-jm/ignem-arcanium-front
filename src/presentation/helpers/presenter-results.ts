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

export function validationErrorResponse(errorsRecord: Record<string, string>) {
  return {
    ok: false,
    data: null,
    validationErrors: errorsRecord
  }
}

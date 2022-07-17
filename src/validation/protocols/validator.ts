export type ValidationResult = Record<string, string> | null

export type Validator<T = unknown> = (input: any, ...auxData: T[]) => ValidationResult

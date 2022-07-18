export type ValidationResult = string | null

export type Validator = (input: any, ...auxData: any) => ValidationResult

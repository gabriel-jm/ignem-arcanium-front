export type ValidationResult = Record<string, string> | null

export type Validator = (input: any) => ValidationResult

export type ValidationResult = Record<string, string> | null

export interface Validator {
  validate(input: any): ValidationResult
}

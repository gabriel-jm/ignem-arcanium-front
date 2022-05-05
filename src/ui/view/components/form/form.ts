export interface IgnemFormElement extends HTMLFormElement {
  setErrors(errorsRecord: Record<string, string>): void
  removeErrors(): void
}

export class IgnemForm extends HTMLFormElement {
  get root() {
    return this
  }

  select<T extends HTMLElement>(query: string) {
    return this.querySelector(query) as T
  }

  setErrors(errorsRecord: Record<string, string>) {
    this.removeErrors()

    Object.entries(errorsRecord).forEach(([field, error]) => {
      const inputMessageSpan = this.select(`input[name=${field}] ~ span`)!
      const input = this[field] as HTMLInputElement

      if(!input) return

      input.classList.add('error')

      inputMessageSpan.textContent = error
    })
  }

  removeErrors() {
    const formElements = Array.from(this.elements)

    formElements.forEach(element => {
      const errorInput = element.classList.contains('error')

      if (!errorInput || element.nodeName !== 'INPUT') return

      const input = element as HTMLInputElement
      
      input.classList.remove('error')
      
      const inputMessageSpan = this.select(`input[name=${input.name}] ~ span`)!
      inputMessageSpan.textContent = ''
    })
  }
}

customElements.define('ignem-form', IgnemForm, { extends: 'form' })
export type FormDataTypes = 'string'|'number'|'boolean'

type FormDataTypeMap = {
  string: string
  number: number
  boolean: boolean
}

type FormDataParser = {
  [K in FormDataTypes]: (value: string) => FormDataTypeMap[K] | null
}

const formDataParser: FormDataParser = {
  string(value) {
    return value || null
  },

  number(value) {
    const isValidValue = value && !isNaN(Number(value))

    return isValidValue
      ? Number(value)
      : null
  },

  boolean(value) {
    if (value === 'true') return true
    if (value === 'false') return false

    return null
  }
}

export class CustomForm extends HTMLFormElement {
  get root() {
    return this
  }

  select<T extends HTMLElement>(query: string) {
    return this.querySelector(query) as T
  }

  get<T extends unknown>(name: string, type: FormDataTypes): T | null {
    const formControl = this.elements.namedItem(name) as HTMLInputElement

    if (!formControl) return null

    return formDataParser[type](formControl.value) as T
  }

  getData<T extends Record<string, unknown | null>>(
    schema: Record<string, FormDataTypes>
  ): T {
    return Object.fromEntries(
      Object
        .entries(schema)
        .map(([fieldName, fieldType]) => {
          return [fieldName, this.get(fieldName, fieldType)]
        })
    ) as T
  }

  setErrors(errorsRecord?: Record<string, string> | null) {
    this.removeErrors()

    if (!errorsRecord) return

    Object.entries(errorsRecord).forEach(([field, error]) => {
      const input = this[field] as HTMLInputElement

      input?.classList?.add('error')

      const inputMessageElement = this.select(
        `[name=${field}] ~ .form-control-message`
      )

      if (inputMessageElement) {
        inputMessageElement.textContent = error
      }
    })
  }

  removeErrors() {
    const formElements = Array.from(this.elements)

    formElements.forEach(element => {
      const errorInput = element.classList.contains('error')

      if (!errorInput || element.nodeName === 'BUTTON') return

      const input = element as HTMLInputElement
      
      input?.classList.remove('error')
      
      const inputMessageElement = this.select(
        `[name=${input.name}] ~ .form-control-message`
      )

      if (inputMessageElement) {
        inputMessageElement.textContent = ''
      }
    })
  }
}

customElements.define('ignem-form', CustomForm, { extends: 'form' })

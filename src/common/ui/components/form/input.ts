import { el, html } from 'lithen-fns'
import { toHtmlAttributes } from '../../helpers/html-attributes.js'

export const InputMasks = {
  ONLY_NUMBERS: /\D+/g
} as const

type inputFieldProps = {
  label?: string
  className?: string
  name: string
  type?: string
  placeholder?: string
  mask?: keyof typeof InputMasks | RegExp
}

export function inputField(props: inputFieldProps) {
  const { label, className, mask, ...attributes } = props

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement

    if (mask) {
      input.value = input.value.trim().replace(mask, '')
    }

    if (input.value && input.classList.contains('error')) {
      input.classList.remove('error')
      input.nextElementSibling!.textContent = ''
    }
  }

  return html`
    <label class="form-control-container">
      ${label && el/*html*/`<span>${label}</span>`}
      <input
        class="form-control ${className}"
        on-input=${onInput}
        ${toHtmlAttributes(attributes)}
      />
      <p class="form-control-message"></p>
    </label>
  ` 
}


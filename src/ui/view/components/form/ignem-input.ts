import { toHtmlAttributes } from '@/ui/helpers'
import { html, raw } from 'lithen-tag-functions'

export const InputMasks = {
  ONLY_NUMBERS: /\D+/g
} as const

type IgnemInputProps = {
  label?: string
  className?: string
  name: string
  type?: string
  placeholder?: string
  mask?: keyof typeof InputMasks | RegExp
}

export function ignemInput(props: IgnemInputProps) {
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
      ${label && raw`<span>${label}</span>`}
      <input
        class="${className || 'form-control'}"
        on-input=${onInput}
        ${toHtmlAttributes(attributes)}
      />
      <p class="form-control-message"></p>
    </label>
  ` 
}


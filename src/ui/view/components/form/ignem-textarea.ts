import { html } from 'lithen-tag-functions'

export interface IgnemTextareaProps {
  label?: string
  className?: string
}

export function ignemTextarea({ label, className }: IgnemTextareaProps) {
  return html`
    <label class="form-control-container">
      ${label && html`<span>${label}</span>`}
      <textarea class="${className || 'form-control'}"></textarea>
    </label>
  `
}

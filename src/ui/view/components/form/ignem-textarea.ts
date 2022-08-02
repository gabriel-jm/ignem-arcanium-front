import { html } from 'lithen-tag-functions'

export interface IgnemTextareaProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  containerClassName?: string
}

export function ignemTextarea({
  label,
  name,
  placeholder,
  containerClassName,
  className
}: IgnemTextareaProps) {
  return html`
    <label class="form-control-container ${containerClassName}">
      ${label && html`<span>${label}</span>`}
      <textarea
        class="form-control ${className}"
        name="${name}"
        placeholder="${placeholder}"
      ></textarea>
      <p class="form-control-message"></p>
    </label>
  `
}

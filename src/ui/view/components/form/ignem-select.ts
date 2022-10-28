import { html } from 'lithen-tag-functions'

export interface IgnemSelectProps {
  label?: string
  name: string
  options: string[]
  className?: string
  placeholder?: string
}

export function ignemSelect({
  label,
  options,
  name,
  className,
  placeholder
}: IgnemSelectProps) {
  return html`
    <label class="form-control-container">
      ${label && html`<span>${label}</span>`}
      <select
        name="${name}"
        class="form-control ${className}"
      >
        ${placeholder && html`
          <option hidden value="">${placeholder}</option>
        `}
        ${options.map(option => html`
          <option value="${option}">${option}</option>
        `)}
      </select>
      <p class="form-control-message"></p>
    </label>
  `
}

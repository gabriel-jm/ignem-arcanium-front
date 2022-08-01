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
    <label class="select-container">
      ${label && html`<span>${label}</span>`}
      <select
        name="${name}"
        ${className ? `class="${className}"` : 'class="select"'}
      >
        ${placeholder && html`<option hidden>${placeholder}</option>`}
        ${options.map(option => html`
          <option value="${option}">${option}</option>
        `)}
      </select>
    </label>
  `
}

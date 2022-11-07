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
  function onChange(event: Event) {
    const select = event.target as HTMLSelectElement

    if (select.value && select.classList.contains('error')) {
      select.classList.remove('error')
      select.nextElementSibling!.textContent = ''
    }
  }

  return html`
    <label class="form-control-container">
      ${label && html`<span>${label}</span>`}
      <select
        class="form-control ${className}"
        name="${name}"
        on-change=${onChange}
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

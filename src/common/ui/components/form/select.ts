import { html } from 'lithen-fns'

export interface selectFieldProps {
  label?: string | Text
  name: string
  options: string[]
  className?: string
  placeholder?: string
  onChange?: Function
}

export function selectField({
  label,
  options,
  name,
  className,
  placeholder,
  onChange
}: selectFieldProps) {
  function onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement

    if (select.value && select.classList.contains('error')) {
      select.classList.remove('error')
      select.nextElementSibling!.textContent = ''
    }

    onChange?.(event)
  }

  return html`
    <label class="form-control-container">
      ${label && html`<span>${label}</span>`}
      <select
        class="form-control ${className}"
        name="${name}"
        on-change=${onSelectChange}
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

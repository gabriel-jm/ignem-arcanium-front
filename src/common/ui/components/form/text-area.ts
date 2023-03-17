import { html } from 'lithen-fns'

export interface textAreaFieldProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  containerClassName?: string
}

export function textAreaField({
  label,
  name,
  placeholder,
  containerClassName,
  className
}: textAreaFieldProps) {
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

import { html, raw } from 'lithen-tag-functions'

interface IgnemInputProps {
  label?: string
  className?: string
  name: string
  placeholder?: string
}

export const ignemInput = (props: IgnemInputProps) => html`
  <label>
    ${props.label && raw`<span>${props.label}</span>`}
    <input
      ${props.className && `class="${props.className}"`}
      name="${props.name}"
      ${props.placeholder && `placeholder="${props.placeholder}"`}
    />
    <span class="input-message"></span>
  </label>
`

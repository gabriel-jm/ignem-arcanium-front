import { capitalize } from '@/ui/helpers'
import { css, html, raw } from 'lithen-tag-functions'

export const propertiesFormaterStyles = css`
  .property-container span {
    display: inline-block;
    font-size: 0.9rem;
    padding: 0 4px;
    background-color: var(--bright-black);
    border-radius: 4px;
  }

  .property-container span:not(:last-of-type) {
    margin-right: 6px;
  }
`

export function propertiesFormater(propertyNames: string[]) {
  return html`
    <span class="property-container">
      ${propertyNames.map(property => raw`
        <span>${capitalize(property)}</span>
      `)}
    </span>
  `
}

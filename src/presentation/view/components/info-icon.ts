import './wrapper'
import { css, html } from 'lithen-tag-functions'

export function infoIcon(animate = false) {
  const styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      width: 100%;
      height: 100%;
    }
    
    :host(.animate) svg circle {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 800ms ease-out 1s forwards;
    }

    :host(.animate) svg line {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 1.2s ease-out 1.5s forwards;
    }

    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }
  `

  return html`
    <ignem-wrapper ${animate && 'class="animate"'} css="${styles}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </ignem-wrapper>
  `
}

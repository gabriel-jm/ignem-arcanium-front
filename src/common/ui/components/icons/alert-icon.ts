import { css, raw } from 'lithen-fns'
import { iconsStyles } from '@/ui/view'

export function alertIcon() {
  const styles = css`
    ${iconsStyles}
    
    svg circle {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 800ms ease-out 1s forwards;
    }

    svg line {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 1.2s ease-out 1.5s forwards;
    }
  `

  return raw`
    <ignem-wrapper css="${styles}">
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
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </ignem-wrapper>
  `
}

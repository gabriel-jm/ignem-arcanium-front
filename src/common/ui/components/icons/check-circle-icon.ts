import { css, el } from 'lithen-fns'
import { iconsStyles } from '@/ui/view'

export function checkCircleIcon() {
  const styles = css`
    ${iconsStyles}

    svg path {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 800ms ease-out 1s forwards;
    }

    svg polyline {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 900ms ease-out 1.5s forwards;
    }
  `

  return el/*html*/`
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="8 11 12 15 22 4"></polyline>
      </svg>
    </ignem-wrapper>
  `
}
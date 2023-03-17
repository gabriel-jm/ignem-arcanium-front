import { iconsStyles } from '@/ui/view/styles/index.js'
import { css, el } from 'lithen-fns'

export function loadingIcon() {
  const styles = css`
    ${iconsStyles}

    svg {
      stroke-dashoffset: 56;
      stroke-dasharray: 26;
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `
  
  return el/*html*/`
    <ignem-wrapper class="loading-icon" css="${styles}">
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
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
        />
      </svg>
    </ignem-wrapper>
  `
}

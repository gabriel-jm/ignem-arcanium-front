import { iconsStyles } from '@/ui/view/index.js'
import { el } from 'lithen-fns'

export const chevronUpIcon = () => el/*html*/`
  <ignem-wrapper class="chevron-up-icon" css="${iconsStyles}">
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </ignem-wrapper>
`

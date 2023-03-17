import { raw } from 'lithen-fns'
import { iconsStyles } from '@/ui/view/styles'

export const minusIcon = () => raw`
  <ignem-wrapper class="minus-icon" css="${iconsStyles}">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </ignem-wrapper>
`

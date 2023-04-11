import { raw } from 'lithen-fns'
import { iconsStyles } from '../../index.js'

export function verticalDotsIcon() {
  return raw/*html*/`
    <ignem-wrapper class="vertical-dots-icon" css="${iconsStyles}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </svg>
    </ignem-wrapper>
  `
}
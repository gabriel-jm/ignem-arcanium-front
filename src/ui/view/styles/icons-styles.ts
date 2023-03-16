import { css } from 'lithen-fns'

export const iconsStyles = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`

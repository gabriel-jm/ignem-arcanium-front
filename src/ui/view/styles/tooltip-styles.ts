import { css } from 'lithen-tag-functions'

export const tooltipStyles = css`
  [data-tooltip] {
    position: relative;
  }

  [data-tooltip]::after {
    content: attr(data-tooltip);
    display: block;
    position: absolute;
    width: max-content;
    top: 0;
    left: 50%;
    font-size: 0.9rem;
    padding: 2px 6px;
    background-color: #252525;
    border: 1px solid #252525;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transform-origin: bottom;
    transform: translate(-50%, -100%) scale(0);
    transition: all 100ms 250ms;
  }

  [data-tooltip]:hover::after {
    opacity: 1;
    transform-origin: bottom;
    transform: translate(-50%, -100%) scale(1);
  }
`

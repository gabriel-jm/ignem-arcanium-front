import { css, raw } from 'lithen-fns'

export const textBetweenDashesStyles = css`
  .text-between-dashes {
    display: flex;
    align-items: center;
    margin: 30px 0;
    color: var(--sub-font-color);
  }

  .text-between-dashes > .line {
    width: 100%;
    height: 1px;
    background-color: var(--sub-font-color);
  }

  .text-between-dashes span {
    display: inline-block;
    width: min-content;
    padding: 0 20px;
    text-align: center
  }
`

export const textBetweenDashes = (text: string) => raw`
  <div class="text-between-dashes">
    <span class="line"></span>
    <span>${text}</span>
    <span class="line"></span>
  </div>
`

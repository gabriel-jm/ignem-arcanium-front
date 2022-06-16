import { css, raw } from 'lithen-tag-functions'

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

  .text-between-dashes > :not(.line) {
    width: 200px;
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

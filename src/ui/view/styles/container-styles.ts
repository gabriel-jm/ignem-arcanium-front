import { css } from 'lithen-tag-functions'

export const containerStyles = css`
  .container {
    display: block;
    max-width: var(--max-content-width);
    margin: auto;
    padding: 24px;
  }

  @media only screen and (max-width: 450px) {
    .container {
      padding: 16px;
    }
  }
`

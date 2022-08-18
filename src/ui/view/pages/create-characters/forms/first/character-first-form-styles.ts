import { css } from 'lithen-tag-functions'

export const characterFirstFormStyles = css`
  .icons-title {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .icons-container {
    background-color: #1b1b1b;
    padding: 10px 12px;
    display: flex;
    gap: 12px;
    border-radius: 4px;
  }

  .icon {
    width: 80px;
    border: 1px solid var(--container-border-color);
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background-color 200ms;
  }

  .icon img {
    pointer-events: none;
  }

  .icon:hover {
    background-color: var(--transparent-white);
  }

  .icon.selected {
    outline: 2px solid var(--outline-white);
  }

  .first-form {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
  }

  .description {
    grid-column: 1 / 3;
  }

  .form-control.description {
    overflow: auto;
    resize: vertical;
    max-height: 200px;
    min-height: 100px;
  }

  @media screen and (max-width: 375px) {
    .first-form {
      display: flex;
      flex-direction: column;
    }
  }
`

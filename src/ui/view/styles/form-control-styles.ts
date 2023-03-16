import { css } from 'lithen-fns'

export const formControlStyles = css`
  .form-control-container span {
    display: inline-block;
    padding-bottom: 4px;
    font-size: 1.05rem;
  }

  .form-control {
    --form-control-outline: var(--outline-white);
    --form-control-border-color: #555;

    width: 100%;
    background-color: var(--body-bg-color);
    border: 1px solid var(--form-control-border-color);
    border-radius: 4px;
    color: var(--font-color);
    font-size: 0.9rem;
    padding: 6px 10px;
    transition: all 250ms;
  }

  .form-control:focus {
    box-shadow: 0 0 0 2px var(--form-control-outline);
  }

  .form-control.error {
    --form-control-border-color: #a14747;
  }

  .form-control.error:focus {
    --form-control-outline: var(--danger);
  }

  .form-control-message {
    font-size: 0.9rem;
    height: 0.9rem;
    width: fit-content;
    color: #a14747;
  }
`

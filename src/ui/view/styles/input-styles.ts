import { css } from 'lithen-tag-functions'

export const inputStyles = css`
  .input {
    --input-outline: var(--btn-focus-outline-color);
    --input-border-color: #555;

    width: 100%;
    background-color: var(--body-bg-color);
    border: 1px solid var(--input-border-color);
    border-radius: 4px;
    color: var(--font-color);
    font-size: 0.9rem;
    padding: 4px 6px;
    transition: all 300ms;
  }

  .input:focus {
    box-shadow: 0 0 0 2px var(--input-outline);
  }

  .input.error {
    --input-border-color: #a14747;
  }

  .input.error:focus {
    --input-outline: var(--danger);
  }

  .input-message {
    height: 15px;
    color: #a14747;
    font-size: 0.85rem;
  }

  .input-message.animate {
    animation: drop 500ms;
  }

  @keyframes drop {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

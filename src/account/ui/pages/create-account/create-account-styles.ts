import { containerStyles, buttonStyles, formControlStyles } from '@/common/ui/styles/index.js'
import { css } from 'lithen-fns'

export const createAccountStyles = css`
  ${[containerStyles, buttonStyles, formControlStyles]}

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .account-form {
    max-width: 320px;
    padding: 20px;
  }

  .form-title {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 45px;
  }

  .account-form label {
    display: block;
    margin: 8px 0;
  }

  .btn {
    width: 100%;
    margin-top: 16px;
  }

  .btn:disabled {
    pointer-events: none;
    filter: brightness(0.6);
  }

  .login-message {
    margin-top: 28px;
    font-size: 0.9rem;
    color: var(--sub-font-color);
    text-align: center;
  }

  .link {
    text-decoration: underline;
    background-color: transparent;
    border: 0;
    font-size: 0.9rem;
    font-weight: normal;
    font-family: var(--font-family);
    width: 100%;
    text-align: center;
    cursor: pointer;
    color: var(--sub-font-color);
  }
`
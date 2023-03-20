import { textBetweenDashesStyles } from '@/common/ui/components/index.js'
import { containerStyles, buttonStyles, formControlStyles } from '@/common/ui/styles/index.js'
import { css } from 'lithen-fns'

const additionalStyles = [
  containerStyles,
  buttonStyles,
  formControlStyles,
  textBetweenDashesStyles
]

export const loginStyles = css`
  ${additionalStyles}

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    max-width: 320px;
    padding: 20px;
  }

  .form-title {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 45px;
  }

  .login-form label {
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

  .link {
    display: block;
    text-decoration: underline;
    background-color: transparent;
    border: 0;
    font-size: 1.1rem;
    font-weight: normal;
    font-family: var(--font-family);
    width: 100%;
    text-align: center;
    cursor: pointer;
    color: var(--sub-font-color);
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0005;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading.hide {
    display: none;
  }

  .loading .loading-icon {
    width: 80px;
  }
`
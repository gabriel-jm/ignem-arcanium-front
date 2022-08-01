import { inputAndSelectStyles, textBetweenDashesStyles, buttonStyles, borderedButtonStyles } from '@/ui/view'
import { css } from 'lithen-tag-functions'

export const characterModalStyles = css`
  ${[
    inputAndSelectStyles,
    textBetweenDashesStyles,
    buttonStyles,
    borderedButtonStyles
  ]}

  .text-between-dashes {
    margin-bottom: 0px;
  }

  .text-between-dashes span {
    color: var(--font-color);
    font-size: 1.2rem;
  }

  dialog {
    margin: auto;
    width: 85%;
    height: 85%;
    background-color: var(--body-bg-color);
    border: 0px solid var(--container-border-color);
    border-radius: 4px;
    animation: show-dialog 250ms;
    color: var(--font-color);
    box-shadow: 0 2px 5px 3px #050505aa;
    overflow: hidden;
  }

  dialog::backdrop {
    background-color: #0505059a;
  }

  dialog.close {
    animation: close-dialog 200ms ease-in;
  }

  .modal-container {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-rows: 60px auto 70px;
  }

  .modal-header {
    position: sticky;
    top: 0;
    background-color: var(--body-bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }

  .modal-header h2 {
    font-size: 1.75rem;
  }

  .close-btn {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    color: var(--font-color);
  }

  .characters-form {
    margin: 20px 0;
    overflow-y: auto;
  }

  .inputs, .attributes, .text-between-dashes, .buttons {
    padding: 0 30px;
  }

  .inputs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .inputs .input-container {
    flex: 1;
    flex-basis: 100px;
  }

  .inputs .input-container:first-of-type {
    flex: 3;
    flex-shrink: 0;
    flex-basis: 100%;
  }

  .attributes-warn {
    text-align: center;
    color: var(--sub-font-color);
    margin: 10px 0 30px 0;
    padding: 0 16px;
  }

  .attributes {
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-weight: bold;
    justify-content: space-around;
  }

  .attr-input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    width: 160px;
    min-width: 160px;
    background-color: #3a3a3a;
    padding: 8px 10px;
    border-radius: 4px;
    text-align: center;
    transition: all 300ms ease-in-out;
  }

  .attr-input-group input {
    display: inline-block;
    width: 30px;
    border: 0;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: var(--body-bg-color);
    color: var(--font-color);
    font-size: 0.95rem;
    text-align: center;
    appearance: textfield;
  }

  .attr-input-group input::-webkit-outer-spin-button,
  .attr-input-group input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .attr-input-group:focus-within {
    box-shadow: 0 0 0 2px var(--btn-focus-outline-color);
    color: var(--font-color);
  }

  .attr-input-group.error {
    background-color: var(--danger);
  }
  
  .attr-input-group.error:focus-within {
    box-shadow: 0 0 0 2px var(--semitransparent-danger);
  }

  .buttons {
    position: sticky;
    bottom: 0px;
    padding: 10px;
    background-color: var(--body-bg-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .buttons button {
    width: 160px;
    font-size: 1rem;
  }

  @keyframes close-dialog {
    to {
      transform: scale(0.15);
      opacity: 0;
    }
  }

  @keyframes show-dialog {
    from {
      transform: scale(0.15);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media only screen and (max-width: 450px) {
    dialog {
      width: 100%;
      height: 100%;
    }
    
    .attr-input-group {
      width: 90%;
    }

    .buttons {
      padding: 8px 20px 8px 20px;
      justify-content: stretch;
      gap: 8px;
    }

    .buttons button {
      flex: 1;
    }
  }
`

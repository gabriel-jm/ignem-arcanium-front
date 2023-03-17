import { css } from 'lithen-fns'
import { tooltipStyles } from '@/ui/view/styles/index.js'

export const characterSecondFormStyles = css`
  ${tooltipStyles}

  .attributes-warn {
    text-align: center;
    color: var(--sub-font-color);
    margin: 10px 0 30px 0;
    padding: 0 16px;
  }

  .stats-container {
    margin-bottom: 40px;
    text-align: center;
  }

  .stats-container span {
    display: inline-block;
    width: 200px;
    margin: 8px;
    background-color: var(--black);
    padding: 8px;
    border-radius: 4px;
    cursor: default;
  }

  .attributes {
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-weight: bold;
    justify-content: space-around;
    padding: 0 30px;
    padding-bottom: 15px;
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
    box-shadow: 0 0 0 2px var(--outline-white);
    color: var(--font-color);
  }

  .attr-input-group.error {
    background-color: var(--danger);
  }
  
  .attr-input-group.error:focus-within {
    box-shadow: 0 0 0 2px var(--semitransparent-danger);
  }
`

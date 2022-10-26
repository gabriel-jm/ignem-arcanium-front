import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

export class IgnemSteps extends IgnemElement {
  styling() {
    return css`
      .steps-container {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        padding-bottom: 20px;
      }

      .step {
        width: 60px;
        text-align: center;
        position: relative;
        font-weight: bolder;
        background-color: var(--danger);
        padding: 18px 22px;
        border-radius: 50%;
      }

      .step::after {
        content: attr(message);
        position: absolute;
        top: 110%;
        left: -1%;
      }

      .step:not(:last-of-type)::before {
        content: '';
        position: absolute;
        display: block;
        width: 100px;
        height: 8px;
        background-color: green;
        top: 50%;
        left: 90%;
        z-index: -1;
        transform: translateY(-50%);
      }
    `
  }
  
  render() {
    return html`
      <div class="steps-container">
        <div class="step" message="General Info">
          1
        </div>
        <div class="step" message="Attributes">
          2
        </div>
        <div class="step" message="Equipment slot">
          3
        </div>
      </div>
    `
  }
}

customElements.define('ignem-steps', IgnemSteps)

import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html, raw } from 'lithen-tag-functions'

export class IgnemSteps extends IgnemElement {
  styling() {
    return css`
      .steps-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 24px;
        flex-wrap: wrap;
      }

      .step {
        width: 60px;
        height: 60px;
        text-align: center;
        position: relative;
        font-weight: bolder;
        background-color: var(--bright-black);
        padding: 18px;
        border-radius: 50%;
        cursor: pointer;
      }

      .step::after {
        content: attr(message);
        width: 80px;
        color: var(--font-color);
        font-size: 0.95rem;
        text-align: center;
        position: absolute;
        top: 110%;
        left: -16%;
      }

      .line {
        flex: 1;
        width: 110%;
        height: 6px;
        background-color: var(--bright-black);
      }

      .step.passed, .line.passed {
        color: var(--black);
        background-color: var(--white);
      }
    `
  }
  
  render() {
    function onClickStep(event: Event) {
      const step = Number((event.target as HTMLElement).textContent)

      console.log(step)
    }

    const currentStep = Number(this.getAttribute('current-step'))
    const stepMessages = this.getAttribute('steps')
      ?.split(',')
      .map((message, index, arr) => {
        const step = index + 1
        const stepElement = html`
          <div
            on-click=${onClickStep}
            class="step ${step <= currentStep && 'passed'}"
            message="${message.trim()}"
          >
            ${step}
          </div>
          ${step !== arr.length && raw`
            <div
              class="line ${step < currentStep && 'passed'}"
            ></div>
          `}
        `

        return stepElement
      })

    return html`
      <div class="steps-container">
        ${stepMessages}
      </div>
    `
  }
}

customElements.define('ignem-steps', IgnemSteps)

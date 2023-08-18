import { IgnemElement } from '@/common/ui/ignem-element.js'
import { css, html, el } from 'lithen-fns'

/**
 * @attr {string} steps
 * @attr {number} current-step
 */
export class IgnemSteps extends IgnemElement {
  #currentStep = 1
  #totalSteps!: number

  constructor() {
    super()
    this.applyRender()
    const step = Number(this.getAttribute('current-step') ?? 1)
    this.currentStep = step
  }

  get currentStep() {
    return this.#currentStep
  }

  set currentStep(value: number) {
    this.#currentStep = value
    
    this.selectAll('.step').forEach((element, index) => {
      const step = index + 1

      if (step <= this.#currentStep) {
        element.classList.add('passed')
      } else {
        element.classList.remove('passed')
      }
    })

    this.selectAll('.line').forEach((element, index) => {
      const step = index + 1

      if (step < this.#currentStep) {
        element.classList.add('passed')
      } else {
        element.classList.remove('passed')
      }
    })
  }

  previous() {
    if (this.currentStep - 1 >= 0) {
      this.currentStep--
    }
  }

  next() {
    if (this.currentStep + 1 <= this.#totalSteps) {
      this.currentStep++
    }
  }

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
        background-color: var(--black-800);
        padding: 18px;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 200ms ease-in;
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
        background-color: var(--black-800);
        transition: background-color 200ms ease-in;
      }

      .step.passed, .line.passed {
        color: var(--black-900);
        background-color: var(--white-900);
      }
    `
  }
  
  render() {
    const onClickStep = (event: Event) => {
      const clickedStep = Number((event.target as HTMLElement).textContent)

      this.dispatchEvent(new CustomEvent('click-step', {
        detail: { clickedStep }
      }))
    }

    const stepMessages = this.getAttribute('steps')?.split(',') ?? []
    this.#totalSteps = stepMessages.length

    const stepElements = stepMessages.map((message, index, arr) => {
      const step = index + 1
      return html`
        <div
          class="step"
          on-click=${onClickStep}
          message="${message.trim()}"
        >
          ${step}
        </div>
        ${step !== arr.length && el/*html*/`
          <div class="line"></div>
        `}
      `
    })

    return html`
      <div class="steps-container">
        ${stepElements}
      </div>
    `
  }
}

customElements.define('ignem-steps', IgnemSteps)

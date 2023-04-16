import { css, el } from 'lithen-fns'
import { t } from '../singles/translation.js'

const themeTabStyles = css`
  h2 {
    padding-bottom: 24px;
  }

  form {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  label {
    display: block;
    padding: 8px 16px;
    background-color: var(--transparent-white);
    border-radius: 4px;
    cursor: pointer;
  }
`

export function themeTab() {
  const currentTheme = document.body.className

  return el/*html*/`
    <ignem-wrapper css="${themeTabStyles}">
      <h2>${t('Theme')}</h2>

      <form>
        <label>
          Dark Black &nbsp;
          <input
            type="radio"
            name="theme"
            value="dark-black"
            ${currentTheme === 'dark-black' && 'checked'}
            on-change=${(e: Event) => {
              const target = e.target as HTMLInputElement

              if (target.checked) {
                document.body.className = target.value
              }
            }}
          />
        </label>

        <label>
          Dark Blue &nbsp;
          <input
            type="radio"
            name="theme"
            value="dark-blue"
            ${currentTheme === 'dark-blue' && 'checked'}
            on-change=${(e: Event) => {
              const target = e.target as HTMLInputElement

              if (target.checked) {
                document.body.className = target.value
              }
            }}
          />
        </label>

        <label>
          Light Black &nbsp;
          <input
            type="radio"
            name="theme"
            value="light-black"
            ${currentTheme === 'light-black' && 'checked'}
          />
        </label>

        <label>
          Light Blue &nbsp;
          <input
            type="radio"
            name="theme"
            value="light-blue"
            ${currentTheme === 'light-blue' && 'checked'}
          />
        </label>
      </form>
    </ignem-wrapper>
  `
}
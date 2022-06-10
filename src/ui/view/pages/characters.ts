import '@/ui/view'
import { Presenter } from '@/presentation/protocols'
import { containerStyles, characterCardStyles } from '@/ui/view'
import { breadcrumbs, characterCard } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

interface Character {
  id: string
  name: string
  icon: string
  level: number
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charism: number
}

export class IgnemCharactersPage extends IgnemElement {
  #findAllCharactersPresenter: Presenter
  
  constructor(findAllCharactersPresenter: Presenter) {
    super()
    this.#findAllCharactersPresenter = findAllCharactersPresenter
  }

  async connectedCallback() {
    const result = await this.#findAllCharactersPresenter.handle<Character[]>()

    if (result.ok) {
      const charactersList = result.data
        .map(characterCard)
        .concat(html`<button class="new-btn">&plus; New</button>`)

      this.select('.characters-list')?.append(...charactersList)
    }
  }

  styling() {
    return css`
      ${[containerStyles, characterCardStyles]}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      .characters-list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .new-btn {
        min-height: 114px;
        min-width: 250px;
        max-width: 425px;
        flex: 1;
        border: 1px solid var(--container-border-color);
        background-color: transparent;
        color: var(--container-border-color);
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 250ms;
      }

      .new-btn:hover, .new-btn:focus {
        box-shadow: 0 0 1px 2px var(--container-border-color);
        color: var(--sub-font-color);
      }
    `
  }
  
  render() {
    const pathsRecord = {
      Home: '/home',
      Characters: 'current'
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(pathsRecord)}

        <h2 class="characters-title">Characters</h2>

        <div class="characters-list"></div>
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)

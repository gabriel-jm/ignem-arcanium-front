import '@/ui/view'
import './modal/ignem-character-modal'
import { Presenter } from '@/presentation/protocols'
import { containerStyles } from '@/ui/view'
import { breadcrumbs, loadingIcon } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { characterCard, characterCardStyles } from './card/character-card'
import { router } from 'lithen-router'
import { IgnemCharacterModal } from './modal/ignem-character-modal'
import { FindAllCharactersResult } from '@/domain/protocols/use-cases'

type Character = FindAllCharactersResult

export class IgnemCharactersPage extends IgnemElement {
  #findAllCharactersPresenter: Presenter
  
  constructor(findAllCharactersPresenter: Presenter) {
    super()
    this.#findAllCharactersPresenter = findAllCharactersPresenter

    this.applyRender()
    this.init()
  }

  async init() {
    const result = await this.#findAllCharactersPresenter.handle<Character[]>()

    this.select('.loading-icon')?.remove()

    const onClickCharacterCard = (character: Character) => {
      return () => {
        this.select<IgnemCharacterModal>('ignem-character-modal')
          .open(character)
      }
    }

    if (!result.ok) return 

    const charactersList = result.data
      .map(character => characterCard(character, onClickCharacterCard(character)))
      .concat(html`
        <button
          class="new-btn"
          on-click=${() => router.goTo('/characters/create')}
        >
          &plus; New
        </button>
      `)       

    this.select('.characters-list')?.append(...charactersList)
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
        width: 100%;
        flex-shrink: 0;
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

      @media only screen and (max-width: 1024px) {
        .characters-list {
          justify-content: center;
        }
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

        <div class="characters-list">
          ${loadingIcon()}
        </div>

        <ignem-character-modal  />
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)

import './modal/ignem-character-modal.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { containerStyles } from '@/common/ui/styles/index.js'
import { IgnemElement } from '@/ui/view/ignem-element.js'
import { css, html, ref } from 'lithen-fns'
import { characterCard, characterCardStyles } from './card/character-card.js'
import { router } from '@/main/config/routes.js'
import { IgnemCharacterModal } from './modal/ignem-character-modal.js'
import { FindAllCharactersResult } from '@/domain/protocols/use-cases/index.js'
import { UiNotifier } from '@/common/ui/notifiers/index.js'
import { breadcrumbs, loadingIcon } from '@/common/ui/components/index.js'
import { confirmDialogStyles, confirmDialog } from '../../components/index.js'

type Character = FindAllCharactersResult

interface CharactersPageProps {
  findAllCharacters: Presenter
  deleteCharacter: Presenter
}

export class IgnemCharactersPage extends IgnemElement {
  #props: CharactersPageProps
  #dialogRef = ref<DialogElement>()
  #characterModalRef = ref<IgnemCharacterModal>()
  #currentChar?: Character
  
  constructor(props: CharactersPageProps) {
    super()
    this.#props = props

    this.applyRender()
    this.init()
  }

  async init() {
    const result = await this.#props.findAllCharacters.handle<Character[]>()

    this.select('.loading-icon')?.remove()

    const onClickCharacterCard = (character: Character) => {
      return () => {
        console.log(this.#characterModalRef.el)
        this.#characterModalRef.el?.open(character)
      }
    }

    const onCharacterDelete = (character: Character) => {
      return () => {
        this.#dialogRef.el?.showModal()
        this.#currentChar = character
      }
    }

    if (!result.ok) return 

    const charactersList = result.data
      .map(character => characterCard(
        character,
        onClickCharacterCard(character),
        onCharacterDelete(character)
      ))
      .concat(html`
        <button
          class="new-btn"
          on-click=${() => router.navigate('/characters/create')}
        >
          &plus; New
        </button>
      `)       

    this.select('.characters-list')?.append(...charactersList)
  }

  styling() {
    return css`
      ${[containerStyles, characterCardStyles, confirmDialogStyles]}

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

    const onConfirm = async () => {
      if (!this.#currentChar) return

      const characterId = this.#currentChar.id

      const result = await this.#props.deleteCharacter.handle({
        characterId
      })

      if (result.ok) {
        this.select(`.character-card[key-id="${characterId}"]`)?.remove()
        new UiNotifier().notifySuccess('Success', 'Character deleted with success')
      }
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(pathsRecord)}

        <h2 class="characters-title">Characters</h2>

        <div class="characters-list">
          ${loadingIcon()}
        </div>

        <ignem-character-modal ref=${this.#characterModalRef} />
      </section>

      ${confirmDialog({
        ref: this.#dialogRef,
        message: 'Are you sure you want to delete this character?',
        onConfirm
      })}
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)

import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-tag-functions'

export const sharedStyles = () => defineSharedStyles(css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    -webkit-tap-highlight-color: transparent;
  }
`)

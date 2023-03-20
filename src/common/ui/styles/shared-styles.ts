import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-fns'

export const sharedStyles = () => defineSharedStyles(css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    -webkit-tap-highlight-color: transparent;
  }

  *::-webkit-scrollbar {
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    width: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 4px;
  }
`)

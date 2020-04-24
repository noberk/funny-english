import React, { FC, useContext } from 'react'
import './index.css'
import {
  BrowserPropsProvider,
  browserWindowContext,
} from '../../shared/window-context'

interface MenuProps {
  emojiIcon?: string
  scale?: number

  throb?: boolean
}

const _Menu: FC<MenuProps> = (props) => {
  const { width, height } = useContext(browserWindowContext)
  let fontSize: number = 12
  let { emojiIcon = '🚀', scale = 2, throb = true } = props

  return (
    <div
      className={throb ? 'menu-icon-beat-up' : ''}
      style={{ fontSize: scale * fontSize }}
    >
      {emojiIcon}
    </div>
  )
}

export const Menu: FC<MenuProps> = (props) => {
  return (
    <BrowserPropsProvider>
      <_Menu {...props} />
    </BrowserPropsProvider>
  )
}

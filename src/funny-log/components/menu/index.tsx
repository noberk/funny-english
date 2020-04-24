import React, { FC, useContext } from 'react'
import './index.css'
import {
  BrowserPropsProvider,
  browserWindowContext,
} from '../../shared/window-context'

interface MenuProps {
  emojiIcon?: string
  scale?: number
  offsetTop?: number
  offsetLeft?: number
  throb?: boolean
}

const _Menu: FC<MenuProps> = (props) => {
  const { width = 0, height = 30 } = useContext(browserWindowContext)
  let fontSize: number = 12

  //default value assignment
  let {
    emojiIcon = '🚀',
    scale = 2,
    throb = true,
    offsetTop = 0,
    offsetLeft = 0,
  } = props

  return (
    <div
      className={throb ? 'menu-icon-beat-up' : ''}
      style={{
        fontSize: scale * fontSize,
        left: width - offsetLeft,
        top: height - offsetTop,
      }}
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

import React, { FC } from 'react'
import './index.css'

interface MenuProps {
  emojiIcon?: string
  scale?: number

  throb?: boolean
}

export const Menu: FC<MenuProps> = (props) => {
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

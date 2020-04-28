import React, { FC } from 'react'
import { Draggable } from './layer/draggable'
import { Menu } from './components/menu'

export const FunnyLog: FC = () => {
  return (
    <>
      <Draggable x={500} y={700}>
        <Menu emojiIcon="📦" scale={3} throb menuName={['📜', '⚙️', '🐷']} />
      </Draggable>
    </>
  )
}

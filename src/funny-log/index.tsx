import React, { FC } from 'react'
import { Draggable } from './layer/draggable'
import { Menu } from './components/menu'

export const FunnyLog: FC = () => {
  return (
    <>
      <Draggable x={300} y={200}>
        <Menu emojiIcon="📦" scale={4} throb menuName={['📜', '⚙️','🐷']} />
      </Draggable>
    </>
  )
}

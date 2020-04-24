import React, { FC } from 'react'
import { Draggable } from './layer/draggable'
import { Menu } from './components/menu'

export const FunnyLog: FC = () => {
  return (
    <>
      <Draggable>
        <Menu emojiIcon="🚀" scale={4} />
      </Draggable>
    </>
  )
}

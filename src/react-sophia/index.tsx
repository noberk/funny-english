import React, { FC } from 'react'
import { Draggable } from './src/layer/draggable'
import { Menu } from './src/components/menu'
import { PickValuesOfObjectArray } from './src/type'

export const MENU_ROUTER = [
  { name: '📜', nav: 'stateReview' },
  { name: '⚙️', nav: 'settings' },
  { name: '🗑️', nav: 'Wastebasket' },
  // { name: '🐷', nav: 'unblock' },
] as const

// export type Z = PickValuesOfObjectArray< typeof MENU_ROUTER, 'nav'>
export const FunnyLog: FC = () => {
  return (
    <>
      <Draggable x={500} y={700}>
        <Menu minWidth={200} maxWidth={600} emojiIcon="📦" scale={3} throb menuName={MENU_ROUTER} />
      </Draggable>
    </>
  )
}

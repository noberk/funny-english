import React, { FC } from 'react'
import { Draggable } from './components/draggable'
import { Menu } from './components/menu'
import './sophia.css'
import { MENU_ROUTER } from './shared/emojis'

export const Sophia: FC<ISophia> = props => {
  return (
    <>
      <Draggable className="grdq2a0x2p6xt">
        <Menu minWidth={200} maxWidth={600} emojiIcon={props.emojiIcon ?? '🎊'} scale={3} throb menuName={MENU_ROUTER} />
      </Draggable>
    </>
  )
}

export interface ISophia {
  /**it should be a single emoji String for best presentation, you can search emoji on google as you like 😀 */
  emojiIcon?: string
}

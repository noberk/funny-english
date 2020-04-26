import React, { FC, CSSProperties, useContext, useEffect } from 'react'
import type { DraggableProps } from './draggable'
import { browserWindowContext, BrowserPropsProvider } from '../../shared/window-context'
import { useObject } from '../../hooks/useObject'
import { getHeight, getWidth } from '../../../utils/browser'

const STYLES: CSSProperties = {
  position: 'absolute',
  zIndex: 100,
}
const SIZE = {
  width: 20,
  height: 20,
}

const _Draggable: FC<DraggableProps> = props => {
  const { object: p, updateObject } = useObject(
    {
      pressed: false,
      pressedX: 0,
      pressedY: 0,
      x: 0,
      y: 0,
      callee: 'draggable',
    },
    { supervise: false, forceCleanUp: false }
  )
  useEffect(() => {
    updateObject({
      x: getWidth() - props.x!,
      y: getHeight() - props.y!,
    })
  }, [])

  function mouseDown(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    updateObject({
      pressed: true,
      pressedX: ev.clientX,
      pressedY: ev.clientY,
    })
  }
  function mouseMove(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (p.pressed) {
      let changeX = ev.clientX - p.pressedX
      let changeY = ev.clientY - p.pressedY
      console.log(ev.clientX, ev.clientY, changeX, changeY)

      updateObject({
        x: p.x + changeX,
        y: p.y + changeY,
        pressedX: ev.clientX,
        pressedY: ev.clientY,
      })
    }
  }
  function mouseUp() {
    updateObject('pressed', false)
  }
  return (
    <div
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      // onMouseOut={mouseUp}
      onDoubleClick={e => void e.preventDefault()}
      style={{
        ...STYLES,
        width: props.width,
        height: props.height,
        left: p.x,
        top: p.y,
        userSelect: 'none',
      }}
    >
      {props.children}
    </div>
  )
}

export const Draggable: FC<DraggableProps> = props => {
  return (
    <BrowserPropsProvider>
      <_Draggable {...props} />
    </BrowserPropsProvider>
  )
}

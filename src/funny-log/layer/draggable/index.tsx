import React, { FC, CSSProperties, useEffect } from 'react'
import type { DraggableProps } from './draggable'
import { BrowserPropsProvider } from '../../shared/window-context'
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
  const { object, updateObject } = useObject(
    {
      pressed: false,
      pressedX: 0,
      pressedY: 0,
      x: 0,
      y: 0,
      callee: 'draggable',
      onMouseUp: () => {
        console.log(123)
      },
      alert() {
        alert(1)
      },
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
    if (object.pressed) {
      let changeX = ev.clientX - object.pressedX
      let changeY = ev.clientY - object.pressedY

      updateObject({
        x: object.x + changeX,
        y: object.y + changeY,
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
      onMouseOut={mouseUp}
      onDoubleClick={e => void e.preventDefault()}
      style={{
        ...STYLES,
        width: props.width,
        height: props.height,
        left: object.x,
        top: object.y,
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

import React, { FC, CSSProperties, useContext, useEffect } from 'react'
import type { DraggableProps } from './draggable'
import { browserWindowContext, BrowserPropsProvider } from '../../shared/window-context'
import { useObject } from '../../hooks/Commonhooks'

const STYLES: CSSProperties = {
  position: 'absolute',
  zIndex: 100,
}
const SIZE = {
  width: 20,
  height: 20,
}

const _Draggable: FC<DraggableProps> = props => {
  const { browserWidth = 0, browserHeight = 0, windowEv } = useContext(browserWindowContext)
  const { object: p, updateObject } = useObject(
    {
      pressed: false,
      pressedX: 0,
      pressedY: 0,
      x: 0,
      y: 0,
    },
    { supervise: true, forceCleanUp: true }
  )
  useEffect(() => {
    updateObject({
      x: browserWidth - props.x!,
      y: browserHeight - props.y!,
    })
  }, [browserWidth, browserHeight])

  function mouseDown(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    updateObject({
      pressed: true,
      pressedX: ev.clientX,
      pressedY: ev.clientY,
    })
  }
  function mouseMove(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log(windowEv?.x, windowEv?.y)

    if (p.pressed) {
      let changeX = ev.clientX - p.pressedX
      let changeY = ev.clientY - p.pressedY
      console.log(changeX, changeY)

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

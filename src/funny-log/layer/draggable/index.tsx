import React, { FC, CSSProperties } from 'react'
import { DraggableProps } from './draggable'

const STYLES: CSSProperties = {
  position: 'absolute',

  zIndex: 100,
}

export const Draggable: FC<DraggableProps> = (props) => {
  function drag(event: React.DragEvent<HTMLDivElement>) {
    console.log(event.clientX, event.clientY)
  }
  return (
    <div
      onDrag={drag}
      style={{ ...STYLES, width: props.width, height: props.height }}
    >
      {props.children}
    </div>
  )
}

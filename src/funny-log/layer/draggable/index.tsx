import React, { FC, CSSProperties, useContext } from 'react'
import type { DraggableProps } from './draggable'
import {
  browserWindowContext,
  BrowserPropsProvider,
} from '../../shared/window-context'

const STYLES: CSSProperties = {
  position: 'absolute',
  zIndex: 100,
}

const _Draggable: FC<DraggableProps> = (props) => {
  const { width = 0, height = 30 } = useContext(browserWindowContext)

  let { offsetTop = 0, offsetLeft = 0 } = props
  function drag(event: React.DragEvent<HTMLDivElement>) {
    console.log(event.clientX, event.clientY)
  }
  return (
    <div
      onDrag={drag}
      style={{
        ...STYLES,
        width: props.width,
        height: props.height,
        left: width - offsetLeft,
        top: height - offsetTop,
      }}
    >
      {props.children}
    </div>
  )
}

export const Draggable: FC<DraggableProps> = (props) => {
  return (
    <BrowserPropsProvider>
      <_Draggable {...props} />
    </BrowserPropsProvider>
  )
}

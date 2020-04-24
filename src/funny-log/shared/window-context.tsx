import React, { FC, useState } from 'react'

interface WindowProps {
  width: number
  height: number
}
const browserWindow = React.createContext<WindowProps>({})
export const Draggable: FC<WindowProps> = (props) => {
    useState
  return <browserWindow.Provider value={}> {props.children} </browserWindow.Provider>
}

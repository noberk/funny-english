import React, { FC, useState, useEffect } from 'react'
import { useObjectState } from '../hooks/Commonhooks'

interface WindowProps {
  width?: number
  height?: number
}
export const browserWindowContext = React.createContext<WindowProps>({})
export const BrowserPropsProvider: FC<WindowProps> = (props) => {
  const { updateParams, objectParams } = useObjectState<WindowProps>({})
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      console.log(e)
    })
  }, [])
  return (
    <browserWindowContext.Provider value={objectParams}>
      {props.children}
    </browserWindowContext.Provider>
  )
}

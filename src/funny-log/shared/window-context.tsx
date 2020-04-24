import React, { FC, useState, useEffect } from 'react'
import { useObjectState } from '../hooks/Commonhooks'
import { getWidth, getHeight } from '../../utils/browser'

interface WindowProps {
  width?: number
  height?: number
}
export const browserWindowContext = React.createContext<WindowProps>({})
export const BrowserPropsProvider: FC<WindowProps> = (props) => {
  const { updateParams, objectParams } = useObjectState<WindowProps>(
    {},
    { supervise: true }
  )
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      updateParams({
        width: getWidth(),
        height: getHeight(),
      })
    })
  }, [])
  return (
    <browserWindowContext.Provider value={objectParams}>
      {props.children}
    </browserWindowContext.Provider>
  )
}

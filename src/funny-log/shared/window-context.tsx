import React, { FC, useState, useEffect } from 'react'
import { useObjectState } from '../hooks/Commonhooks'
import { getWidth, getHeight } from '../../utils/browser'

interface WindowProps {
  browserWidth?: number
  browserHeight?: number
}
export const browserWindowContext = React.createContext<WindowProps>({})
export const BrowserPropsProvider: FC<WindowProps> = (props) => {
  const { updateParams, objectParams } = useObjectState<WindowProps>(
    { browserHeight: 0, browserWidth: 0 },
    { supervise: true }
  )
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      updateParams({
        browserWidth: getWidth(),
        browserHeight: getHeight(),
      })
    })
    window.addEventListener('load', () => {
      updateParams({
        browserWidth: getWidth(),
        browserHeight: getHeight(),
      })
    })
  }, [])
  return (
    <browserWindowContext.Provider value={objectParams}>
      {props.children}
    </browserWindowContext.Provider>
  )
}

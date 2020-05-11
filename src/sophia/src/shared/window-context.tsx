import React, { FC, useState, useEffect } from 'react'
import { useObject } from '../hooks/useObject'
import { getWidth, getHeight } from '../util/browser'

interface WindowProps {
  browserWidth?: number
  browserHeight?: number

  windowEv?: MouseEvent | null
}
export const browserWindowContext = React.createContext<WindowProps>({})
export const BrowserPropsProvider: FC<WindowProps> = props => {
  const { object, updateObject } = useObject<WindowProps>({ browserHeight: 0, browserWidth: 0, windowEv: null }, { sceneName: '🦄d3AmwDw0🦄' })

  function syncBrwoserWindowInfo({ e }: { e?: MouseEvent }) {
    let empty = object

    empty.browserWidth = getWidth()
    empty.browserHeight = getHeight()
    if (e) {
      empty.windowEv = e
    }
    updateObject(empty)
  }

  useEffect(() => {
    window.addEventListener('resize', e => {
      syncBrwoserWindowInfo({})
    })
    window.addEventListener('load', () => {
      syncBrwoserWindowInfo({})
    })
    window.addEventListener('mousemove', e => {
      syncBrwoserWindowInfo({ e })
    })
  }, [])
  return <browserWindowContext.Provider value={object}>{props.children}</browserWindowContext.Provider>
}

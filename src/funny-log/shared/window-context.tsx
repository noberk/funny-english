import React, { FC, useState, useEffect } from 'react'
import { useObject } from '../hooks/useObject'
import { getWidth, getHeight } from '../../utils/browser'

interface WindowProps {
  browserWidth?: number
  browserHeight?: number

  windowEv?: MouseEvent | null
}
export const browserWindowContext = React.createContext<WindowProps>({})
export const BrowserPropsProvider: FC<WindowProps> = props => {
  const { object, updateObject } = useObject<WindowProps>({ browserHeight: 0, browserWidth: 0, windowEv: null, callee: 'BrowserPropsProvider' }, { supervise: false, forceCleanUp: false })

  function syncBrwoserWindowInfo({ me }: { me?: MouseEvent }) {
    let empty = object

    empty.browserWidth = getWidth()
    empty.browserHeight = getHeight()
    if (me) {
      empty.windowEv = me
    }
    updateObject(empty)
  }

  useEffect(() => {
    window.addEventListener('resize', e => {
      console.log(1)

      syncBrwoserWindowInfo({})
    })
    window.addEventListener('load', () => {
      syncBrwoserWindowInfo({})
    })
    window.addEventListener('mousemove', e => {
      syncBrwoserWindowInfo({ me: e })
    })
  }, [])
  return <browserWindowContext.Provider value={object}>{props.children}</browserWindowContext.Provider>
}

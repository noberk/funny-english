import React, { FC, useState, useEffect } from 'react'
import './index.css'
import { BrowserPropsProvider } from '../../shared/window-context'
import { os } from '../../hooks/objectStore'
import { LOADIPHLPAPI } from 'dns'

interface MenuProps {
  emojiIcon?: string
  scale?: number
  offsetTop?: number
  offsetLeft?: number
  throb?: boolean
  menuName: string[]
}

const _Menu: FC<MenuProps> = props => {
  let fontSize: number = 12

  let [subItemVisible, setSubItemVisible] = useState(false)
  let [curObj, setCurObj] = useState<any>({})
  //default value assignment
  let { emojiIcon = '📓 ', scale = 2, throb = true, offsetTop = 0, offsetLeft = 0 } = props

  useEffect(() => {
    console.log(11)
  }, [curObj])
  return (
    <div
      onMouseOver={() => setSubItemVisible(true)}
      onMouseOut={() => setSubItemVisible(false)}
      className={throb ? 'menu-icon-beat-up' : ''}
      style={{
        fontSize: scale * fontSize,
      }}
    >
      {emojiIcon}
      <div style={{ display: subItemVisible ? 'block' : 'none', fontSize: (scale * fontSize) / 2 }}>
        {props.menuName.map(name => (
          <span>{name}</span>
        ))}
      </div>
      <div className="menu-panel-info" style={{ width: 200, height: 200, background: '#00235410', fontSize: 14 }}>
        {os.callees.map(p => (
          <span
            onClick={() => {
              setCurObj(os.get(p) ?? {})
              console.log(os.get(p) ?? {})
            }}
          >
            {p}
            <br />
          </span>
        ))}
        <br />
        {renderState()}
      </div>
    </div>
  )
  function renderState() {
    return Object.keys(curObj).map(key => {
      return (
        <p>
          {key} : {curObj[key] + ''}
        </p>
      )
    })
  }
}

export const Menu: FC<MenuProps> = props => {
  return (
    <BrowserPropsProvider>
      <_Menu {...props} />
    </BrowserPropsProvider>
  )
}

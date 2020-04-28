import React, { FC, useState, useEffect } from 'react'
import './index.css'
import { BrowserPropsProvider } from '../../shared/window-context'
import { os } from '../../hooks/objectStore'

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
  let eachIconWidth = 50
  let [subItemVisible, setSubItemVisible] = useState(true)
  let [touchedBox, setTouchedBox] = useState(false)
  let [curCallee, setCurCallee] = useState<string>('')
  //default value assignment
  let { emojiIcon = '📓 ', scale = 2, throb = true } = props

  useEffect(() => {}, [os.get(curCallee)])

  return (
    <div
      onMouseOver={() => setSubItemVisible(true)}
      // onMouseOut={() => setSubItemVisible(false)}
      className={throb ? 'menu-icon-beat-up' : ''}
      style={{
        fontSize: scale * fontSize,
      }}
    >
      <header
        onMouseOver={() => {
          setTouchedBox(true)
        }}
        onMouseOut={() => {
          setTouchedBox(false)
        }}
      >
        <div className="menu-panel-wrapper" style={{ width: eachIconWidth }}>
          <span>{emojiIcon}</span>
          {props.menuName.map(name => (
            <span className="menu-panel-item-span ">{name}</span>
          ))}
        </div>
        {/* <div className={`${touchedBox ? 'menu-item-touched' : 'menu-item-untouched'}`} style={{ fontSize: (scale * fontSize) / 1 }}></div> */}
      </header>

      <div className="menu-panel-info" style={{ width: 200, padding: 5, background: '#00235410', fontSize: 14 }}>
        {os.callees.map(callee => (
          <span onClick={() => setCurCallee(callee)}>
            {callee}
            <br />
          </span>
        ))}
        <br />
        {renderState()}
      </div>
    </div>
  )
  function renderState() {
    const curStateObject: any = os.get(curCallee) ?? {}
    return Object.keys(curStateObject).map(key => {
      return (
        <p>
          {key} : {curStateObject[key] + ''}
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

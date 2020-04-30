import React, { FC, useState, useEffect } from 'react'
import './index.css'
import { BrowserPropsProvider } from '../../shared/window-context'
import { os } from '../../hooks/objectStore'
import { useObject } from '../../hooks/useObject'
import { AvailableNav } from '../..'
import { Colorful } from '../toolkit/colorful'

const _Menu: FC<MenuProps> = props => {
  let fontSize: number = 12
  let eachIconWidth = 50
  let badgeWidth = 20
  let [, setSubItemVisible] = useState(true)
  let [, setTouchedBox] = useState(false)
  let [curCallee, setCurCallee] = useState<string>('')
  let { object, updateObject } = useObject<{
    nav: AvailableNav
  }>({
    nav: 'Wastebasket',
    callee: 'menu',
  })
  //default value assignment
  let { emojiIcon = '📓 ', scale = 2, throb = true, minWidth, maxWidth } = props

  useEffect(() => {}, [os.get(curCallee)])

  return (
    <div
      onMouseOver={() => setSubItemVisible(true)}
      onMouseOut={() => setSubItemVisible(false)}
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
          {props.menuName.map((item, index) => (
            <span key={index} className="menu-panel-item-span " onClick={() => updateObject('nav', item.nav)}>
              {item.name}
            </span>
          ))}
        </div>
      </header>
      {renderContentByClickedMenu()}
    </div>
  )
  function renderState() {
    const curStateObject: any = os.get(curCallee) ?? {}

    return (
      <div style={{ marginTop: 16 }}>
        {Object.keys(curStateObject).map((key, index) => {
          const value = curStateObject[key]
          return <Colorful objectKey={key} key={index} value={value} badgeWidth={badgeWidth} />
        })}
      </div>
    )
  }

  function renderContentByClickedMenu() {
    if (object.nav === 'Wastebasket') return

    if (object.nav === 'stateReview') {
      return (
        <div className="menu-panel-info">
          <nav style={{ minWidth, maxWidth }}>
            {os.callees.map((callee,index) => (
              <span key={index}  className="nav-span" onClick={() => setCurCallee(callee)}>
                {callee}
                <br />
              </span>
            ))}
          </nav>

          {renderState()}
        </div>
      )
    }
  }
}

export const Menu: FC<MenuProps> = props => {
  return (
    <BrowserPropsProvider>
      <_Menu {...props} />
    </BrowserPropsProvider>
  )
}

interface MenuProps {
  minWidth: number
  maxWidth: number
  emojiIcon?: string
  scale?: number
  offsetTop?: number
  offsetLeft?: number
  throb?: boolean
  menuName: readonly { name: string; nav: AvailableNav }[]
}

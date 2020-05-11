import React, { FC, CSSProperties, useEffect, DOMAttributes, ReactNode, useRef } from 'react'
import { DrawNativeTypeRow, TYPE_COLORS } from './native-type-factory'
import { FLEX, StringTypeStyle } from '../../shared/styles'
import { analyzeFuncParams } from '../../util/func-analysis'
import { getExtraSVG } from '../../svgs/svgBadge'
import { useObject } from '../../hooks/useObject'
import { getEmptyArray } from '../../util/array-ex'
import { KeyBoard } from '../../shared/keyboard'
import { os } from '../../archive/objectStore'
import nestedProperty from '../../util/nested-property'

const KEY_STYLE: CSSProperties = {
  marginLeft: 2,
  marginRight: 2,
  position: 'relative',
  top: -5,
}
const DATA_TYPE_WRAPPER_STYLE: CSSProperties = { position: 'relative', top: 0, lineHeight: '20px' }

export const ColorfulRows = (props: { objectKey: string; value: string; badgeWidth?: number }) => <RenderPropertyOfObjectOrArray objectKey={props.objectKey} value={props.value} objHierarchy={''} />

export const CSpan: FC<{ color?: string; ml?: string | number; className?: string; style?: React.CSSProperties } & DOMAttributes<HTMLSpanElement>> = props => {
  let { ml = 6 } = props

  return (
    <span {...props} style={{ marginLeft: ml, color: props.color, ...props.style }}>
      {props.children}
    </span>
  )
}

/**This function will be rendered the each property of an object or an item of an Array */
export const RenderPropertyOfObjectOrArray = (props: { objectKey: string; value: any; objHierarchy: string }): JSX.Element => {
  let abyss = ',' + props.objectKey.toString() + props.objHierarchy.toString()

  const typeDesc = new DrawNativeTypeRow(props.value, props.objectKey, abyss).getNativeTypeDescription()

  return (
    <div style={{ marginTop: 10, ...FLEX }}>
      <aside>
        {typeDesc?.self.getDefualtTypeSVG()} <span style={KEY_STYLE}>{props.objectKey} :</span>
      </aside>
      <article style={DATA_TYPE_WRAPPER_STYLE}>
        {typeDesc?.beforeNode} {typeDesc?.mainBody} {typeDesc?.afterNode}
      </article>
    </div>
  )
}
export const RenderFuncInParameters: FC<{ value: Function; shouldExecute: number }> = props => {
  const funcArguments = analyzeFuncParams(props.value)
  const { object, updateObject } = useObject({ isFirst: true, argument: getEmptyArray(funcArguments.length) })
  useEffect(() => {
    if (object.isFirst) updateObject('isFirst', false)
    else Reflect.apply(props.value, undefined, object.argument)
  }, [props.shouldExecute])
  return (
    <div>
      {funcArguments.map((arg, i) => {
        return (
          <div key={i} style={{ marginTop: 10 }}>
            {getExtraSVG('wrench')({ width: 16 })} {arg} :{' '}
            <input
              value={object.argument[i]}
              type="text"
              onChange={e => {
                object.argument[i] = e.target.value
                updateObject('argument', object.argument)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
/** This function give you a ablitiy to edit string value which came from the  `datasource` perhaps it took much time to calculation */
export const RenderEditableString: FC<{
  prefix: ReactNode
  affix: ReactNode
  value: string
  fieldName: string
  hierarchy: string
  nextHierarchy?: string | null
  fromType?: 'object' | 'array'
}> = props => {
  const { object, updateObject, recover } = useObject({ hovered: false, clicked: false, __sv__: props.value })
  const _input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (object.clicked) {
      _input.current?.focus()
    }
  }, [object.clicked])
  function modifyText(e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) {
    recover(['__sv__'])
    update()
  }
  function update() {
    let objPath = props.hierarchy!.substring(1).split(',').reverse().join('.')
    if (props.fromType === 'object') {
      if (props.nextHierarchy !== null) {
        objPath += `.${props.nextHierarchy}`
      }
 
    } else if (props.fromType === 'array') {
    } else {
    }
    const copiedO = os.currentScene.object
    nestedProperty.set(copiedO, objPath, object.__sv__)
    os.currentScene.set(copiedO)
  }
  return (
    <>
      {!object.clicked && (
        <CSpan
          onClick={() => updateObject('clicked', true)}
          onMouseOver={() => updateObject('hovered', true)}
          onMouseOut={() => updateObject('hovered', false)}
          color={TYPE_COLORS.string}
          style={object.hovered ? StringTypeStyle.hovered : StringTypeStyle.normal}
        >
          {props.prefix}
          {object.__sv__ + ''}
          {props.affix}
        </CSpan>
      )}

      {object.clicked && (
        <input
          ref={_input}
          value={object.__sv__}
          onBlur={modifyText}
          onChange={e => updateObject('__sv__', e.target.value)}
          onKeyDown={e => {
            if (e.keyCode === KeyBoard.Enter) {
              recover(['__sv__'])
              update()
            }
          }}
        />
      )}
    </>
  )
}

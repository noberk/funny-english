import { ReactNode, useState, useEffect, useRef } from 'react'
import { getSVG, getExtraSVG } from '../../svgs/svgBadge'
import { SVGBlockSize } from '../../svgs'
import React from 'react'
import { CSpan, RenderPropertyOfObjectOrArray, RenderFuncInParameters, RenderEditableString } from './type-decorator'
import { EMJS, SYMBOLS } from '../../shared/emojis'
import { getType, ExistNativeType } from '../../type'
import { ITALIC, INLINE_BLOCK, StringTypeStyle } from '../../shared/styles'
import { getUid } from '../../util/random'
import { shorten } from '../../util/string-format'
import { isArrowFunction } from '../../util/func-analysis'
import { useUpdate } from '../../hooks/useUpdate'
import { useObject } from '../../hooks/useObject'
import { KeyBoard } from '../../shared/keyboard'

export const TYPE_COLORS = {
  function: 'rgb(220,220,170)',
  string: '#dd7324',
  number: '#b4c8a0',
  event: 'rgb(235,184,109)',
  boolean: '#569cca',
  null_undefined: '#569cca',
  object: '#000',
  array: '#b4c8a0',
  symbol: '#ff7990',
}

export class DrawNativeTypeRow implements Omit<getNativeTypeDescription, 'getNativeTypeDescription'> {
  private size: SVGBlockSize = {
    //set svg icon size
    width: 20,
    height: 20,
  }

  constructor(protected value: any, protected fieldName: string, public hierarchy: string, public standby?: { nextHierarchyFieldName?: string; curHierarchyType?: 'object' | 'array' }) {}
  textTextColor = ''
  getNativeTypeDescription(): NativeTypeDescription | undefined {
    if (getType(this.value) === 'string')
      return new StringType(
        this.value,
        this.fieldName,
        this.hierarchy,
        (this.standby = { nextHierarchyFieldName: this.standby?.nextHierarchyFieldName, curHierarchyType: this.standby?.curHierarchyType })
      ).getNativeTypeDescription()
    if (getType(this.value) === 'number') return new NumberType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'boolean') return new BooleanType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'function') return new FunctionType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'event') return new EventType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'undefined') return new UndefinedType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'null') return new NullType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'object') return new ObjectType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'symbol') return new SymbolType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()
    if (getType(this.value) === 'array') return new ArrayType(this.value, this.fieldName, this.hierarchy).getNativeTypeDescription()

    return undefined
  }
  getDefualtTypeSVG() {
    return getSVG(this.value)(this.size)
  }
  getRegularBody(prefix: ReactNode = <></>, affix: ReactNode = <></>) {
    let displayValue: string = this.value
    if (getType(this.value) === 'symbol') {
      displayValue = this.value.toString() //symbol has method toString intrinsically but 'undefined & null' doesn't
    }
    if (getType(this.value) === 'function' || getType(this.value) === 'event') {
      displayValue = shorten(this.value + '', 66)
    }
    return (
      <CSpan color={this.textTextColor}>
        {prefix}
        {displayValue + ''}
        {affix}
      </CSpan>
    )
  }
  getStringBody(prefix: ReactNode = <></>, affix: ReactNode = <></>) {
    const { object, updateObject, recover } = useObject({ hovered: false, clicked: false, __sv__: this.value })

    const _input = useRef<HTMLInputElement>(null)
    let displayValue: string = this.value
    useEffect(() => {
      if (object.clicked) {
        _input.current?.focus()
      }
    }, [object.clicked])
    function modifyText(e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) {
      recover()
    }
    return (
      <>
        {!object.clicked && (
          <CSpan
            onClick={() => updateObject('clicked', true)}
            onMouseOver={() => updateObject('hovered', true)}
            onMouseOut={() => updateObject('hovered', false)}
            color={this.textTextColor}
            style={object.hovered ? StringTypeStyle.hovered : StringTypeStyle.normal}
          >
            {prefix}
            {displayValue + ''}
            {affix}
          </CSpan>
        )}

        {object.clicked && (
          <input
            ref={_input}
            value={object.__sv__}
            onBlur={modifyText}
            onChange={e => updateObject('__sv__', e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === KeyBoard.Enter) recover()
            }}
          />
        )}
      </>
    )
  }
  getShrunkenObjectBody() {
    return <CSpan color={TYPE_COLORS.object}>{`{...}`}</CSpan>
  }
  getShrunkenArrayBody(arr: any[]) {
    return <CSpan color={TYPE_COLORS.array}>{`Array (${arr.length})`}</CSpan>
  }
  getFunctionBody() {
    const func: Function = this.value
    const { update, setUpdate } = useUpdate()
    return (
      <article style={{ ...INLINE_BLOCK }}>
        <div>
          <span onClick={setUpdate}>{EMJS.run}</span>{' '}
          <CSpan ml={0} color={'gray'}>
            {shorten(this.value + '', 66)}
          </CSpan>
        </div>

        <RenderFuncInParameters value={func} shouldExecute={update} />
      </article>
    )
  }

  /** for array */
  getArrayBody(deepLevel: number = 0): ReactNode {
    const arrValue: any[] = this.value
    const [expend, setExpend] = useState(false)

    return (
      <article style={{ ...INLINE_BLOCK }}>
        <span
          onClick={e => {
            e.stopPropagation()
            setExpend(!expend)
          }}
        >
          {expend ? EMJS.expend : SYMBOLS.rightPointingTriangle}
        </span>
        <span style={ITALIC}> ({arrValue.length})</span>
        <CSpan ml={10}>[</CSpan>
        {arrValue.map((val, i) => {
          let matchedBody: ReactNode
          if (getType(val) === 'number' || getType(val) === 'string' || getType(val) === 'null' || getType(val) === 'boolean' || getType(val) === 'undefined' || getType(val) === 'symbol') {
            matchedBody = new DrawNativeTypeRow(val, this.fieldName, this.hierarchy).getNativeTypeDescription()?.mainBody
          }
          if (getType(val) === 'function') {
            let funcValue = 'func'
            if (isArrowFunction(val)) {
              funcValue = 'λ-func'
            }
            matchedBody = <CSpan color={TYPE_COLORS.function}>{funcValue}</CSpan>
          }

          if (getType(val) === 'object') {
            matchedBody = this.getShrunkenObjectBody()
          }
          if (getType(val) === 'array') {
            matchedBody = this.getShrunkenArrayBody(val)
          }
          return (
            <span key={getUid()}>
              {matchedBody}
              {i < arrValue.length - 1 ? this.getSeparatorNode(', ') : ''}
            </span>
          )
        })}
        <CSpan>]</CSpan>

        {expend && (
          <div>
            {arrValue.map((p, index) => {
              return (
                <div key={getUid()}>
                  <RenderPropertyOfObjectOrArray objectKey={index.toString()} value={p} objHierarchy={this.hierarchy} />
                </div>
              )
            })}
          </div>
        )}
      </article>
    )
  }

  getObjectBody(obj: { [key: string]: any }): ReactNode {
    const [expend, setExpend] = useState(false)
    const objKeys: string[] = Object.keys(obj)

    return (
      <article style={{ ...INLINE_BLOCK }}>
        <span
          onClick={e => {
            e.stopPropagation()
            setExpend(!expend)
          }}
        >
          {expend ? EMJS.expend : SYMBOLS.rightPointingTriangle}
        </span>
        <span style={ITALIC}> ({objKeys.length})</span>
        <CSpan ml={10}>{'{ '}</CSpan>
        {objKeys.map((fieldName, i) => {
          let val: any = obj[fieldName]
          let matchedBody: ReactNode
          if (getType(val) === 'number' || getType(val) === 'string' || getType(val) === 'null' || getType(val) === 'boolean' || getType(val) === 'undefined' || getType(val) === 'symbol') {
            matchedBody = new DrawNativeTypeRow(val, this.fieldName, this.hierarchy, { nextHierarchyFieldName: fieldName, curHierarchyType: 'object' }).getNativeTypeDescription()?.mainBody
          }
          if (getType(val) === 'function') {
            let funcValue = 'func'
            if (isArrowFunction(val)) {
              funcValue = 'λ-func'
            }
            matchedBody = <CSpan color={TYPE_COLORS.function}>{funcValue}</CSpan>
          }

          if (getType(val) === 'object') {
            matchedBody = this.getShrunkenObjectBody()
          }
          if (getType(val) === 'array') {
            matchedBody = this.getShrunkenArrayBody(val)
          }
          return (
            <span key={getUid()}>
              {`${fieldName} :`} {matchedBody}
              {i < objKeys.length - 1 ? this.getSeparatorNode(', ') : ''}
            </span>
          )
        })}
        <CSpan>{'}'}</CSpan>

        {expend && (
          <div>
            {objKeys.map((k, i) => {
              return (
                <div key={getUid()}>
                  <RenderPropertyOfObjectOrArray objectKey={k} value={obj[k]} objHierarchy={this.hierarchy} />
                </div>
              )
            })}
          </div>
        )}
      </article>
    )
  }
  getSeparatorNode(separator: ReactNode = <></>): ReactNode {
    return (
      <CSpan ml={0} color={'gray'}>
        {separator}
      </CSpan>
    )
  }
}
interface getNativeTypeDescription {
  getNativeTypeDescription(): NativeTypeDescription
  textTextColor: string
}

const StringType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.string
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['string'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: (
        <RenderEditableString
          prefix=""
          affix=""
          value={this.value}
          fieldName={this.fieldName}
          hierarchy={this.hierarchy}
          fromType={this.standby?.curHierarchyType ?? 'object'}
          nextHierarchy={this.standby?.nextHierarchyFieldName ?? null}
        />
      ),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const NumberType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.number
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['number'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const EventType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.event
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['event'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <span onClick={this.value}>{EMJS.run}</span>,
      afterNode: <></>,
    }
  }
}
const FunctionType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.function
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['function'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getFunctionBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const BooleanType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.boolean
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['boolean'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const UndefinedType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.null_undefined
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['undefined'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const NullType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.null_undefined
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['null'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const ObjectType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.object
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['object'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getObjectBody(this.value),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const SymbolType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.symbol
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['object'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const ArrayType = class extends DrawNativeTypeRow implements getNativeTypeDescription {
  textTextColor = TYPE_COLORS.array
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['number'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getArrayBody(),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
export interface NativeTypeDescription {
  typeRange: Array<ExistNativeType>
  typeTextColor: string

  badges: Array<{
    behave: 'invoke' | 'hint'
    display: boolean
    emoji: string
    descrition: ReactNode | string
  }>
  mainBody?: ReactNode
  beforeNode?: ReactNode
  afterNode?: ReactNode
  self: DrawNativeTypeRow
}

import type { ReactNode } from 'react'
import { isString, isNumber, isFunction, isBoolean, isUndefined, isNull, isArray } from 'util'
import { isEvent, getSVG } from '../svgs/svgBadge'
import { SVGBlockSize } from '../svgs'
import React from 'react'
import { CSpan } from './colorful'
import { EMJS } from '../../shared/emojis'

export class NativeTypeRow implements Omit<getNativeTypeDescription, 'getNativeTypeDescription'> {
  private size: SVGBlockSize = {
    width: 20,
    height: 20,
  }
  constructor(protected value: any) {}
  textTextColor = ''
  getNativeTypeDescription(): NativeTypeDescription | undefined {
    if (this.getType() === 'string') return new StringType(this.value).getNativeTypeDescription()
    if (this.getType() === 'number') return new NumberType(this.value).getNativeTypeDescription()
    if (this.getType() === 'boolean') return new BooleanType(this.value).getNativeTypeDescription()
    if (this.getType() === 'function') return new FunctionType(this.value).getNativeTypeDescription()
    if (this.getType() === 'event') return new EventType(this.value).getNativeTypeDescription()
    if (this.getType() === 'array')
      return new (class extends NativeTypeRow implements getNativeTypeDescription {
        textTextColor = '#b4c8a0'
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
      })(this.value).getNativeTypeDescription()

    return undefined
  }
  getDefualtTypeSVG() {
    return getSVG(this.value)(this.size)
  }
  getRegularBody(prefix: ReactNode = <></>, affix: ReactNode = <></>) {
    return (
      <CSpan color={this.textTextColor}>
        {prefix}
        {this.value + ''}
        {affix}
      </CSpan>
    )
  }
  getArrayBody(): ReactNode {
    return <CSpan color={this.textTextColor}>{this.value + ''}</CSpan>
  }
  protected getType(): ExistNativeType {
    if (isBoolean(this.value)) return 'boolean'
    if (isString(this.value)) return 'string'
    if (isNumber(this.value)) return 'number'
    if (isEvent(this.value)) return 'event'
    if (isFunction(this.value)) return 'function'
    if (isUndefined(this.value)) return 'undefined'
    if (isArray(this.value)) return 'array'
    if (isNull(this.value)) return 'null'
    return 'undefined'
  }
}
interface getNativeTypeDescription {
  getNativeTypeDescription(): NativeTypeDescription
  textTextColor: string
}

const StringType = class extends NativeTypeRow implements getNativeTypeDescription {
  textTextColor = '#dd7324'
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['string'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(`"`, `"`),
      self: this,
      beforeNode: <></>,
      afterNode: <></>,
    }
  }
}
const NumberType = class extends NativeTypeRow implements getNativeTypeDescription {
  textTextColor = '#b4c8a0'
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
const EventType = class extends NativeTypeRow implements getNativeTypeDescription {
  textTextColor = 'rgb(235,184,109)'
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
const FunctionType = class extends NativeTypeRow implements getNativeTypeDescription {
  textTextColor = ''
  getNativeTypeDescription(): NativeTypeDescription {
    return {
      typeRange: ['function'],
      typeTextColor: this.textTextColor,
      badges: [],
      mainBody: this.getRegularBody(),
      self: this,
      beforeNode: <span onClick={this.value}>{EMJS.run}</span>,
      afterNode: <></>,
    }
  }
}
const BooleanType = class extends NativeTypeRow implements getNativeTypeDescription {
  textTextColor = '#569cca'
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
type ExistNativeType = 'event' | 'function' | 'string' | 'number' | 'boolean' | 'obejct' | 'undefined' | 'null' | 'array'
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
  self: NativeTypeRow
}

import type { ReactNode } from 'react'

import { isEvent, getSVG } from '../svgs/svgBadge'
import { SVGBlockSize } from '../svgs'
import React from 'react'
import { CSpan } from './colorful'
import { EMJS } from '../../shared/emojis'
import { getType } from '../../type'

export class NativeTypeRow implements Omit<getNativeTypeDescription, 'getNativeTypeDescription'> {
  private size: SVGBlockSize = {
    width: 20,
    height: 20,
  }
  constructor(protected value: any) {}
  textTextColor = ''
  getNativeTypeDescription(): NativeTypeDescription | undefined {
    if (getType(this.value) === 'string') return new StringType(this.value).getNativeTypeDescription()
    if (getType(this.value) === 'number') return new NumberType(this.value).getNativeTypeDescription()
    if (getType(this.value) === 'boolean') return new BooleanType(this.value).getNativeTypeDescription()
    if (getType(this.value) === 'function') return new FunctionType(this.value).getNativeTypeDescription()
    if (getType(this.value) === 'event') return new EventType(this.value).getNativeTypeDescription()
    if (getType(this.value) === 'array')
      return new (class extends NativeTypeRow implements getNativeTypeDescription {
        textTextColor = '#b4c8a0'
        getNativeTypeDescription(): NativeTypeDescription {
          return {
            typeRange: ['number'],
            typeTextColor: this.textTextColor,
            badges: [],
            mainBody: this.getArrayHorizontalBody(this.value),
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
  /** for array */
  getArrayHorizontalBody(arrValue: any[]): ReactNode {
    return (
      <>
        <CSpan color="gray">[</CSpan>
        {arrValue.map(val => {
          if (getType(val) === 'number' || getType(val) === 'string' || getType(val) === 'boolean') {
            return (
              <>
                {new NativeTypeRow(val).getNativeTypeDescription()?.mainBody}
                {this.getSeparatorNode(', ')}
              </>
            )
          }
        })}

        <CSpan color="gray">]</CSpan>
      </>
    )
  }
  getArrayVertiaclBody(): ReactNode {
    return <CSpan color={this.textTextColor}>{this.value + ''}</CSpan>
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

import React, { FC, CSSProperties, ReactNode } from 'react'
import { isString, isNumber, isFunction, isBoolean } from 'util'
import { getSVG, isEvent } from '../svgs/svgBadge'
import { EMJS } from '../../shared/emojis'
import { NativeTypeRow, NativeTypeDescription } from './nativeTypeRow'
import { type } from 'os'

const KEY_STYLE: CSSProperties = {
  marginLeft: 2,
  marginRight: 2,
}
const DATA_TYPE_WRAPPER_STYLE: CSSProperties = { position: 'relative', top: -4 }

export const Colorful = (props: { objectKey: string; value: string; badgeWidth: number }) => {
  // return (
  //   <p style={{ marginTop: 10 }}>
  //     {getSVG(props.value)({ width: props.badgeWidth })}
  //     <span style={DATA_TYPE_WRAPPER_STYLE}>
  //       <span style={KEY_STYLE}> {props.objectKey}</span> : {`${EMJS.run}`} {renderValueOfState(props.value)}
  //     </span>
  //   </p>
  // )
  return renderValueOfState2(props.objectKey, props.value)
}

export const CSpan: FC<{ color: string }> = props => <span style={{ marginLeft: 6, color: props.color }}>{props.children}</span>

function renderValueOfState(value: any, before: ReactNode = <></>, after: ReactNode = <></>) {
  if (isBoolean(value)) return <CSpan color="rgb(86,156,202)">{value + ''}</CSpan>
  if (isString(value)) return <CSpan color="#dd7324">{value}</CSpan>
  if (isNumber(value)) return <CSpan color="rgb(180,200,160)">{value}</CSpan>
  if (isEvent(value)) {
    return <CSpan color="rgb(180,200,160)">{value + ''}</CSpan>
  }
  if (isFunction(value)) return <CSpan color="rgb(220,220,170)">{value}</CSpan>
}
function renderValueOfState2(objectKey: string, value: any): JSX.Element {
  const typeDesc = new NativeTypeRow(value).getNativeTypeDescription()

  return (
    <p style={{ marginTop: 10 }}>
      {typeDesc?.self.getDefualtTypeSVG()}
      <span style={DATA_TYPE_WRAPPER_STYLE}>
        <span style={KEY_STYLE}> {objectKey}</span> : {typeDesc?.beforeNode} {typeDesc?.mainBody} {typeDesc?.afterNode}
      </span>
    </p>
  )
}
function analyzeNativeDataType(value: any): NativeTypeDescription | undefined {
  return new NativeTypeRow(value).getNativeTypeDescription()
}

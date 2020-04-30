import React from 'react'
import { isString, isNumber, isFunction, isBoolean } from 'util'
import { getSVG, isEvent } from '../svgs/svgBadge'
export const Colorful = (props: { key: string; value: string; badgeWidth: number }) => {
  return (
    <p style={{ marginTop: 10 }}>
      {getSVG(props.value)({ width: props.badgeWidth })}
      <span style={{ position: 'relative', top: -4 }}>
        {props.key} : {renderValueOfState(props.value)}
      </span>
    </p>
  )
}
export const CSpan = (props: { color: string; children?: React.ReactNode }) => <span style={{ color: props.color }}>{props.children}</span>

function renderValueOfState(value: any) {
  if (isBoolean(value)) return <CSpan color="rgb(86,156,202)">{value + ''}</CSpan>
  if (isString(value)) return <CSpan color="#dd7324">{value}</CSpan>
  if (isNumber(value)) return <CSpan color="rgb(180,200,160)">{value}</CSpan>
  if (isFunction(value)) return <CSpan color="rgb(220,220,170)">{value}</CSpan>
  if (isEvent(value)) return <CSpan color="#808080">{value}</CSpan>
}

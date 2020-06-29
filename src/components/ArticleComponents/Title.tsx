import React, { CSSProperties, FC } from 'react'

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontFamily: 'modak',
  fontSize: '3rem',
}
const descriptionStyle: CSSProperties = {
  textAlign: 'center',
}
export const Title: FC<{ tilte: string; description: string }> = props => {
  return (
    <div>
      <h1 style={titleStyle}>{props.tilte}</h1>
      <h2 style={descriptionStyle}>{props.description}</h2>
    </div>
  )
}

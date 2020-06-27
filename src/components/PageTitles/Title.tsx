import React, { CSSProperties, FC } from 'react'

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontFamily: 'modak',
  fontSize: '3rem',
}
export const Title :FC<{tilte:string,description:string}>= (props) => {
  return (
    <div>
<h1 style={titleStyle}>{props.tilte}</h1>
      <h2>{props.description}</h2>
    </div>
  )
}

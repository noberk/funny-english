import React, { CSSProperties, FC } from 'react'
export const Paragraphs = (props: { paragraphs: string[] }) => {
  const pad = 30
  return (
    <div style={{ paddingLeft: pad, paddingRight: pad }}>
      {props.paragraphs.map((p: string, key: number) => (
        <p key={key}>{p}</p>
      ))}
    </div>
  )
}

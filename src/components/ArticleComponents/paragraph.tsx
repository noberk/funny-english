import React, { CSSProperties, FC } from 'react'
export const Paragraphs = (props: { paragraphs: string[] }) => {
  return (
    <div>
      {props.paragraphs.map((p: string, key: number) => (
        <p key={key}>{p}</p>
      ))}
    </div>
  )
}

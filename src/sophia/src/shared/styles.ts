import { CSSProperties } from "react";

export const ITALIC: CSSProperties = {
    fontStyle: "italic"
}
export const INLINE_BLOCK: CSSProperties = {
    display: "inline-block"
}
export const INLINE_FLEX: CSSProperties = {
    display: 'inline-flex'
}
export const FLEX: CSSProperties = {
    display: 'flex',
    // transition : 'all .3s cubic-bezier(.78,.14,.15,.86)'

}

// border: 1px solid #5f5f5f;
// border-radius: 2px;
// border-style: dashed;
// padding: 2px;
export const StringTypeStyle = {
    hovered: {
        border: 1,
        borderStyle: 'dashed',
        borderColor: '#5f5f5f',
        borderRadius: 2,
        cursor: "pointer",
        // transition: 'all .3s cubic-bezier(.78,.14,.15,.86)',
    },
    normal: {

    }
}

export function toPixel(val: number) {
    return val + 'px'
}
import { isString, isNumber, isFunction } from 'util'
import * as SVG from '../components/svgs'
export const path: string = '../assets/'
export enum SVGType {
  Class = 'class.svg',
  CodeSegment = 'codesegments.svg',
  Constant = 'const.svg',
  Enum = 'enum.svg',
  Field = 'field.svg',
  Function = 'function.svg',
  Interface = 'interface.svg',
  Keyword = 'keyword.svg',
  Namespace = 'namespace.svg',
  Event = 'event.svg',
}
/** SVG  width&height px*/
const side = '32'
export function isConst(str: string) {
  if (/^[A-Z]+$/.test(str) || /^[A-Z]+/.test(str)) {
    return true
  } else {
    return false
  }
}
export function isEvent(str: string) {
  if (typeof str === 'function') {
    return (str as Function).name.substr(0, 2) == 'on' ? true : false
  }
  return str.substr(0, 2) == 'on' ? true : false
}
export function embedSVG(type: SVGType) {
  let embed = document.createElement('embed')
  embed.width = side
  embed.height = side
  embed.src = path + type

  return embed
}
export function getSVG(value: any) {
  if (isString(value) || isNumber(value)) {
    return SVG.Field
  }
  if (isFunction(value) && isEvent(value)) {
    return SVG.Event
  }
  if (isFunction(value)) {
    return SVG.Function
  }
  return SVG.Field
}

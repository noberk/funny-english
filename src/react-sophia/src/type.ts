import { isString, isNumber, isFunction, isBoolean, isUndefined, isNull, isArray } from 'util'
import { isEvent } from './svgs/svgBadge';
import { MENU_ROUTER } from '..';
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer E)[] ? E : never;

/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 */
export type LiteralUnion<T extends U, U> = T | (U & {});

export type PickValuesOfObjectArray<T extends [], K extends string> = T[number][K]
type PromiseType<T> = T extends Promise<infer U> ? U : never
type GetTruthyKeys<T extends {}> = {
    [key in keyof T]: T[key] extends false ? never : key
}[keyof T]
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

export type MathOperator = "+" | "-" | "*" | "/" | "%"
export type ExpectOperator = "==" | "===" | "!==" | "!="
export type AvailableNav = typeof MENU_ROUTER[number]['nav']
export enum SVGType {
    Class,
    CodeSegment,
    Constant,
    Enum,
    Field,
    Function,
    Interface,
    Keyword,
    Namespace,
    Event,
}
export type ExistNativeType = 'event' | 'function' | 'string' | 'number' | 'boolean' | 'obejct' | 'undefined' | 'null' | 'array'
export function getType(value: unknown): ExistNativeType {
    if (isBoolean(value)) return 'boolean'
    if (isString(value)) return 'string'
    if (isNumber(value)) return 'number'
    if (isEvent(value as string)) return 'event'
    if (isFunction(value)) return 'function'
    if (isUndefined(value)) return 'undefined'
    if (isArray(value)) return 'array'
    if (isNull(value)) return 'null'
    return 'undefined'
}

export function isArrowFunction(fn: Function) {
    let isNonArrowFnRegex = /^\s*function/;
    var isArrowFnWithParensRegex = /^\([^)]*\) *=>/;
    var isArrowFnWithoutParensRegex = /^[^=]*=>/;
    var fnStr = Function.prototype.toString.call(fn);
    return fnStr.length > 0 &&
        !isNonArrowFnRegex.test(fnStr) &&
        (isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr));
};
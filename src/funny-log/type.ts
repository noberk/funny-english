
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

export type MathOperator = "+" | "-" | "*" | "/" | "%"
export type ExpectOperator = "==" | "===" | "!==" | "!="

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

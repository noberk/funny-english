
export interface IELTSReadingMaterial {
    title: string,
    hint: string
    paragraphs: string[]
    section: 1 | 2 | 3
    questions: BaseQuestion<QStatement | QDragMatch>[]
}
export enum QuestionType { Statement, Grab, MultiSelect }
export type QStatementAnswerRange = "true" | 'false' | 'notGiven' | undefined

export interface BaseQuestion<Q> {
    type: QuestionType
    data: Q
    title: string
    directive: string[]
}
export type AnswerRange = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P'


export type QStatementAnswers = {
    desc: string
    correntAnswer: QStatementAnswerRange
    inputAnswer: QStatementAnswerRange
}
export interface QStatement {
    question: {
        desc: string
        correntAnswer: QStatementAnswerRange
        inputAnswer: QStatementAnswerRange
    }[]
}
export interface QDragMatch {
    question: {
        desc: string
        answer: string
    }[]
    questionRange: { order: string, content: string }[]

}
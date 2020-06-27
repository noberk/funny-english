
export interface IELTSReadingMaterial {
    title: string,
    hint: string
    paragraphs: string[]
    section: 1 | 2 | 3
    questions: BaseQuestion<QStatements | QDragMatch>[]
}
export enum QuestionType { Statement, Grab, MultiSelect }

export interface BaseQuestion<Q> {
    type: QuestionType
    data: Q
    title: string
    directive: string[]
}
export type AnswerRange = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P'

export interface QStatements {

}
export interface QDragMatch {
    question: {
        desc: string
        answer: string
    }[]
    questionRange: { order: string, content: string }[]

}
export function initQStatement(range: { from: number, to: number }) {
    const questionRange = initQuestionOrderRange(range.from, range.to)
    const statement: BaseQuestion<QStatements> = {
        type: QuestionType.Statement,
        title: questionRange,
        directive: [
            `In boxes ${questionRange} on your answer sheet write`,
            'TRUE      if the statement agrees with the information',
            'FALSE     if the statement contradicts the information',
            'NOT GIVEN     if there is no information on this'
        ],
        data: {

        }

    }
    return statement
}
export function initQDragMatch(range: { from: number, to: number },
    q: {
        desc: string
        answer: AnswerRange
    }[],
    qr: {
        order: AnswerRange,
        content: string
    }[]) {
    const questionRange = initQuestionOrderRange(range.from, range.to)
    const dragMatch: BaseQuestion<QDragMatch> =
    {
        directive: [
            `The box below gives a list of responses ${initQuestionAlphabetOrderRange(qr)} to the questionnaire discussed in Reading Passage 1.`,
            `Answer the following questions by choosing the correct responses${initQuestionAlphabetOrderRange(qr)}.`,
            `Write your answers in boxes ${questionRange} on your answer sheet.`
        ],
        type: QuestionType.Grab,
        title: questionRange,
        data: {
            question: q,
            questionRange: qr
        }
    }
    return dragMatch
}
function initQuestionOrderRange(from: number, to: number, phyhen: string = '-') {
    return `${from} ${phyhen} ${to}`
}
function initQuestionAlphabetOrderRange(qr: {
    order: AnswerRange,
    content: string
}[], phyhen: string = '-') {
    return `${qr[0].order} ${phyhen} ${qr[qr.length - 1].order}`
}
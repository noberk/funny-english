import type { BaseQuestion, QStatement, QStatementAnswers, AnswerRange, QDragMatch, AnswerOrderRange, QMultiSelect, QMultiSelectAnswers, QuestionAlphabetOrder } from "./types"
import { QuestionType } from "./types"

export function initQStatement(range: AnswerOrderRange, question: QStatementAnswers[]) {
    const questionRange = initQuestionOrderRange(range.from, range.to)
    const statement: BaseQuestion<QStatement> = {
        type: QuestionType.Statement,
        title: questionRange,
        directive: [
            `In boxes ${questionRange} on your answer sheet write`,
            'TRUE      if the statement agrees with the information',
            'FALSE     if the statement contradicts the information',
            'NOT GIVEN     if there is no information on this'
        ],
        data: { question }
    }
    return statement
}
export function initQDragMatch(range: AnswerOrderRange,
    q: {
        desc: string
        answer: AnswerRange
    }[],
    qr: QuestionAlphabetOrder[]) {
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

export function initQMultiSelect(range: AnswerOrderRange, question: QMultiSelectAnswers[]) {
    let questionRange: any = range?.fixedNumber
if (questionRange === undefined) {
        questionRange = initQuestionOrderRange(range?.from, range?.to)
    }
    const data: BaseQuestion<QMultiSelect> = {
        type: QuestionType.MultiSelect,
        title: questionRange,
        directive: [
            `Choose the correct letter, A, B, C, D or E.`,
            `Write your answer in box ${questionRange} on your answer sheet.`
        ],
        data: { question }
    }
    return data
}


function initQuestionOrderRange(from?: number, to?: number, phyhen: string = '-') {
    return `${from} ${phyhen} ${to}`
}
function initQuestionAlphabetOrderRange(qr: {
    order: AnswerRange,
    content: string
}[], phyhen: string = '-') {
    return `${qr[0].order} ${phyhen} ${qr[qr.length - 1].order}`
}
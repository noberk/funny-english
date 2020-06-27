export interface IELTSReadingMaterial {
    title: string,
    hint: string
    paragraphs: string[]
    section: 1 | 2 | 3
    questionType: QStatements
}

export interface QStatements {
    title: string
    directive: string[]
}
function initQStatement(range: { from: number, to: number }) {
    const questionRange = initQuestionOrder(range.from, range.to)
    const statement: QStatements = {
        title: questionRange,
        directive: [
            `In boxes ${questionRange} on your answer sheet write`,
            'TRUE      if the statement agrees with the information',
            'FALSE     if the statement contradicts the information',
            'NOT GIVEN     if there is no information on this'
        ]
    }
    return statement
}
function initQuestionOrder(from: number, to: number, phyhen: string = '-') {
    return `${from} ${phyhen} ${to}`
}
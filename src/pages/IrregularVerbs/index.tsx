import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Title } from '../../components/PageTitles/Title'
import { VerbForms } from '../../data/IrregularVerbs/irregular-verbs'
import { $get, $getLocal } from '../../utils/service'
import { ColumnProps } from 'antd/lib/table/interface'
import { Sound } from '../../components/common'

const columns2: ColumnProps<Partial<VerbForms>>[] = [
  {
    title: 'Infinitive',
    dataIndex: 'infinitive',
    key: 'infinitive',
    render: val => spreadMultipleIrregularVerbs(val),
  },
  {
    title: 'SimplePast',
    dataIndex: 'simplePast',
    key: 'simplePast',
    render: val => spreadMultipleIrregularVerbs(val),
  },
  {
    title: 'PastParticiple',
    dataIndex: 'pastParticiple',
    key: 'pastParticiple',
    render: val => spreadMultipleIrregularVerbs(val),
  },
]
export function spreadMultipleIrregularVerbs(word: string) {
  return word.split(',').map(w => (
    <span style={{ fontSize: '1.3rem', marginRight: 10 }}>
      {w.trim()}
      <Sound word={w.trim()} />
    </span>
  ))
}
export default function () {
  const [irregularVerbList, setIrregularVerbList] = useState<Partial<VerbForms>[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      $getLocal<Partial<VerbForms>[]>('IrregularVerbs/irregular-verbs').then(data => {
        setIrregularVerbList(data)
      })
    } catch (error) {
      setIrregularVerbList([])
    }
  }
  return (
    <>
      <Title
        tilte={'🌴Irregular Verbs & Lists🌴'}
        description={
          'A regular verb is any verb whose conjugation follows the typical pattern, or one of the typical patterns, of the language to which it belongs. A verb whose conjugation follows a different pattern is called an irregular verb.'
        }
      />

      <Table dataSource={irregularVerbList} columns={columns2} />
    </>
  )
}

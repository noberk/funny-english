import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Title } from '../../components/PageTitles/Title'
import { VerbForms } from '../../data/IrregularVerbs/irregular-verbs'
import { $get } from '../../utils/service'
import { ColumnProps } from 'antd/lib/table/interface'

const columns2: ColumnProps<VerbForms>[] = [
  {
    title: 'Infinitive',
    dataIndex: 'infinitive',
    key: 'infinitive',
  },
  {
    title: 'SimplePast',
    dataIndex: 'simplePast',
    key: 'simplePast',
  },
  {
    title: 'PastParticiple',
    dataIndex: 'pastParticiple',
    key: 'pastParticiple',
  },
]

export default function () {
  const [irregularVerbList, setIrregularVerbList] = useState<VerbForms[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const data = await $get<VerbForms[]>('getIrregularVerbs')
      if (Array.isArray(data)) {
        setIrregularVerbList(data)
      } else {
        setIrregularVerbList([])
      }
    } catch (error) {}
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

import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Title } from '../../components/PageTitles/Title'
import { VerbForms } from '../../data/IrregularVerbs/irregular-verbs'
import { $get } from '../../utils/service'

export default function () {
  const [irregularVerbList, setIrregularVerbList] = useState<VerbForms[]>([])

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    $get<VerbForms[]>('getIrregularVerbs')
  }
  return (
    <>
      <Title
        tilte={'🌴Irregular Verbs & Lists🌴'}
        description={
          'A regular verb is any verb whose conjugation follows the typical pattern, or one of the typical patterns, of the language to which it belongs. A verb whose conjugation follows a different pattern is called an irregular verb.'
        }
      />

      <Table dataSource={irregularVerbList} />
    </>
  )
}

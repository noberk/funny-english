import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useObject } from 'react-sophia'
import { IELTSReadingMaterial } from '../../data/IELTS/Cambridge-Reading/types'
import { Title } from '../../components/ArticleComponents/Title'

import './index.scss'
export function AddArticle() {
  const { object, updateObject } = useObject<Partial<IELTSReadingMaterial & { checkBoxValue?: boolean }>>(
    {
      paragraphs: [],
      checkBoxValue: true,
    },
    { sceneName: '🧪 Test Tube' }
  )
  const { paragraphs, title = '123' } = object
  useEffect(() => {
    loadArticle()
  }, [])
  function loadArticle() {
    import('../../data/IELTS/Cambridge-Reading/book-4').then(d => {
      updateObject({
        paragraphs: d.data.paragraphs,
        title: d.data.title,
      })
    })
  }
  function writeAnThesis() {
    return paragraphs?.map((p, i) => <p key={i}>{p}</p>)
  }

  return (
    <div className="addArticle-thesis">
      <Row>
        <Col span={12}>
          <Title tilte={title} description="" />
          {writeAnThesis()}
        </Col>
        <Col span={12}>col</Col>
      </Row>

      <br />
    </div>
  )
}

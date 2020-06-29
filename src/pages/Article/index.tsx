import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useObject } from 'react-sophia'
import { Title } from '../../components/PageTitles/Title'
import { ArticleStructure } from '../../data/Reading/types'
import './index.scss'
export function Article() {
  const { object, updateObject } = useObject<Partial<ArticleStructure>>({})

  useEffect(() => {
    loadArticle()
  }, [])
  function loadArticle() {
    import('../../data/Reading/culture/au').then(d => {
      updateObject({
        content: d.a.content,
        title: d.a.title,
      })
    })
  }

  return (
    <div className="addArticle-thesis">
      <Title tilte={object.title ?? ''} description={object.content ?? ''} />
      {/* <Row>
        <Col span={12}>

        </Col>
        <Col span={12}>col</Col>
      </Row> */}

      <br />
    </div>
  )
}

import React, { useEffect } from 'react'
import { Checkbox, Col, Row } from 'antd'
import { useObject } from 'react-sophia'
import { IELTSReadingMaterial } from '../../data/IELTS/Cambridge-Reading/types'
import { Title } from '../../components/PageTitles/Title'
export function Article() {
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
    return paragraphs?.map(p => <p>{p}</p>)
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <Title tilte={title} description="" />
          {writeAnThesis()}
        </Col>
        <Col span={12}>col</Col>
      </Row>
      <Checkbox
        defaultChecked={object.checkBoxValue}
        value="男"
        onChange={e => {
          console.log(e.target.checked)

          updateObject('checkBoxValue', e.target.checked)
        }}
      >
        不忘初心,跟党走
      </Checkbox>
      <br />
    </div>
  )
}

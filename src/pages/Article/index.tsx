import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { useObject } from 'react-sophia'
import { Title } from '../../components/ArticleComponents/Title'
import { ArticleStructure } from '../../data/Reading/types'
import './index.scss'
import { Paragraphs } from '../../components/ArticleComponents/paragraph'
export function Article() {
  //   const [object, updateObject] = useState<Partial<ArticleStructure>>({ paragraphs: [], title: '' })
  const { object, updateObject } = useObject<Partial<ArticleStructure>>(
    {
      paragraphs: [],
      title: '',
    },
    { sceneName: '🧪 Test Tube2' }
  )
  useEffect(() => {
    loadArticle()
  }, [])
  function loadArticle() {
    import('../../data/Reading/culture/au').then(d => {
      updateObject({
        paragraphs: d.data.paragraphs,
        title: d.data.title,
      })
    })
  }

  return (
    <div className="addArticle-thesis">
      <Title tilte={object.title ?? ''} description={''} />
      <Paragraphs paragraphs={object.paragraphs ?? []} />
      <br />
    </div>
  )
}

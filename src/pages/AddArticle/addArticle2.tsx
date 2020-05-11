import React, { FC, useContext, useEffect } from 'react'
import { BookContextProvider, BookContext } from '../../sophia/src/shared/book-context'
import { Button, Input, Table } from 'antd'
import { useObject } from '../../sophia/src/index'

const _: FC = () => {
  const { object, updateObject } = useObject(
    {
      ...useContext(BookContext),
      d: {
        level1: {
          nname: 512,
          age: 6,
        },
      },
      books: [],
      firstName: 'linda',
      lastName: '',
      age: '',
      grandson: { name: 'minay' },
    },
    { sceneName: '🦠booklist🦠' }
  )
  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    object.getBooks!().then(d => {
      updateObject('books', d as any)
    })
  }
  console.log(object)

  return (
    <div style={{ padding: 20, width: '50%' }}>
      <Button type="primary">{object.name}</Button>
      <div>
        <div>
          Your first name : <Input type="text" value={object.firstName} onChange={e => updateObject('firstName', e.target.value)} />
        </div>
        <div>
          Your last name : <Input type="text" value={object.lastName} onChange={e => updateObject('lastName', e.target.value)} />
        </div>
        <div>
          Your age is : <Input type="text" value={object.age} onChange={e => updateObject('age', e.target.value)} />
        </div>

        <Button type="ghost">{object.grandson.name}</Button>
      </div>

      <Table
        dataSource={object.books}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
        ]}
      />
    </div>
  )
}
export const Article2: FC = props => {
  return (
    <BookContextProvider>
      <_ {...props}></_>
    </BookContextProvider>
  )
}

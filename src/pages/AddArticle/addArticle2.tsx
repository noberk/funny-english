import React, { FC, useContext, useEffect } from 'react'

import { Button, Input, Table } from 'antd'
import { useObject } from 'react-sophia'

const _: FC = () => {
  const { object, updateObject } = useObject(
    {
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

  return (
    <div style={{ padding: 20, width: '50%' }}>
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
  return <_ {...props}></_>
}

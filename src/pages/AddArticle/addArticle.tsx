import React from 'react'
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col } from 'antd'
import { useObject } from 'react-sophia'
export function Article() {
  const { object, updateObject } = useObject(
    {
      buttonValue: 'confirm',
      checkBoxValue: true,
    },
    { sceneName: '🧪 Test Tube' }
  )

  return (
    <div>
      <Button type="primary" onClick={() => updateObject('buttonValue', object.buttonValue + 1)}>
        {object.buttonValue}
      </Button>{' '}
      <br />
      <input type="text" value={object.buttonValue} onChange={e => updateObject('buttonValue', e.target.value)} />
      <br />
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

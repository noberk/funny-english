import React from 'react'
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col } from 'antd'
import { useObject } from '../../sophia/src/index'
export function Article2() {
  const { object, updateObject } = useObject(
    {
      buttonValue: 'comfirm',
    },
    { sceneName: '🧪 Test Tube2' }
  )
  const { object: object1, updateObject: updateObject1 } = useObject(
    {
      buttonValue: '(๑ŐдŐ)b2',
    },
    { sceneName: '😀 Test Tube2' }
  )
  return (
    <div>
      <Button type="primary" onClick={() => updateObject('buttonValue', object.buttonValue + 1)}>
        {object.buttonValue}
      </Button>
      <input type="text" value={object.buttonValue} onChange={e => updateObject('buttonValue', e.target.value)} />
      <input type="text" value={object1.buttonValue} onChange={e => updateObject1('buttonValue', e.target.value)} />
    </div>
  )
}

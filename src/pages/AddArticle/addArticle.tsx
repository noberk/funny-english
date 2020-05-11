import React from 'react'
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col } from 'antd'
import { useObject } from 'react-sophia'
export function Article() {
  const { object, updateObject } = useObject(
    {
      buttonValue: 'comfirm',
    },
    { sceneName: '🧪 Test Tube' }
  )

  return (
    <div>
      <Button type="primary" onClick={() => updateObject('buttonValue', object.buttonValue + 1)}>
        {object.buttonValue}
      </Button>
    </div>
  )
}

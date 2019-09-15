import React from "react";
import { IAddVocabulary } from "../../types";
import { take } from "../../commom/fetch";
import {
    Form,
    Input,
    Select,
    Button,
  } from 'antd';
  
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 8 },
    },
  };
  
  class RegistrationForm extends React.Component<any,any> {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e:any) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    handleConfirmBlur = (e:any) => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule:any, value:any, callback:any) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword =(rule:any, value:any, callback:any) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
 
  
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );
  
       
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Word">
            {getFieldDecorator('Word')(<Input />)}
          </Form.Item>
          <Form.Item label="English Pronounce">
            {getFieldDecorator('English Pronounce')(<Input />)}
          </Form.Item>
          <Form.Item label="American Pronounce">
            {getFieldDecorator('American Pronounce')(<Input />)}
          </Form.Item>
          <Form.Item label="Definition">
            {getFieldDecorator('Definition')(<Input />)}
          </Form.Item>
          <Form.Item label="Definition">
            {getFieldDecorator('Definition')(<Input />)}
          </Form.Item>
      
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
 
       
 
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Add Word
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
 export default WrappedRegistrationForm;

export   class AddVocabulary extends React.Component<any,Partial<IAddVocabulary>> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <>
                   <Input></Input>
            </>
        )
    }
}
  

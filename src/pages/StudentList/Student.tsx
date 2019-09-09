import React from "react";
import { Student } from "../../types";
import { Table } from 'antd';
import {createMockData} from "../../commom/monk";
interface StudentState extends Student{

}


export default class Home extends React.Component<any,StudentState> {
     
    render(){
        return (
            <>
            <Table dataSource={createMockData<Student>(10,
            {  
                key: 0,
                account:"noberk",
                password:"12321312",
                nickname: "王明",
                age: 50,
                job : "撸代码的",
                hobby :"吃"
            }
        )} columns={[
            {title:'Account',dataIndex:'account',key:'account'},
            {title:'Password',dataIndex:'password',key:'password'},
            {title:'Nickname',dataIndex:'nickname',key:'nickname'},
            {title:'Age',dataIndex:'age',key:'age'},
            {title:'Job',dataIndex:'job',key:'job'},
            {title:'Hobby',dataIndex:'hobby',key:'hobby'}
        ]
        }></Table>
            </>
        )
        
        
    }
}
  
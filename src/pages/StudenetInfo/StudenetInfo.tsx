import React from "react";
import { IStudent } from "../../types";
import { Table } from 'antd';
import {createMockData} from "../../commom/monk";
interface StudenetInfoState extends IStudent{

}


export default class StudenetInfo extends React.Component<any,StudenetInfoState> {
     
    render(){
        return (
            <>
            <Table dataSource={createMockData<IStudent>(120,
            {  
                _id : "10",
                key: 0,
                account:"胜多负少东方闪电",
                password:"胜多负少东方闪电",
                nickname: "胜多负少东方闪电",
                age: 520,
                job : "胜多负少东方闪电",
                hobby :"胜多负少东方闪电",
                phone:123
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
  
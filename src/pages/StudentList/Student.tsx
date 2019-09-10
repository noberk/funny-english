import React from "react";
import { IStudent } from "../../types";
import { Table} from 'antd';
import {createMockData} from "../../commom/monk";
import { take } from "../../commom/fetch";


interface StudentState extends IStudent{
    data: IStudent[];
}


export default class Studnet extends React.Component<any,Partial<StudentState>> {

    constructor(props: any) {
        super(props)

        this.state = {
            data: []
        }
        take<Array<IStudent>>("http://localhost:3333/").then(d => {
            console.log(d);
              this.setState({ data: d });
        })
    }
    render(){
        return (
            <>
        
             <Table  size={"small"} dataSource={this.state.data } columns={[
            {title:'Unique',dataIndex:'_id',key:'_id'},
            {title:'Account',dataIndex:'account',key:'account'},
            {title:'Password',dataIndex:'password',key:'password'},
            {title:'Nickname',dataIndex:'nickname',key:'nickname'},
            {title:'Age',dataIndex:'age',key:'age'},
            {title:'Job',dataIndex:'job',key:'job'},
            {title:'Hobby',dataIndex:'hobby',key:'hobby'},
            {title:'phone',dataIndex:'phone',key:'phone'},
    
        ]
        }>
        </Table>
            </>
        )
    }
}
  

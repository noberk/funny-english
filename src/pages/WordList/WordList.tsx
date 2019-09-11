import React from "react";
import { IWordList } from "../../types";
import { Table, Input, Button, Row, Col } from 'antd';
import { createMockData } from "../../commom/monk";
import { Beam } from "../styled";

const { Search } = Input;

interface WordListState extends IWordList { }
export default class WordList extends React.Component<any, WordListState> {

    render() {
        return (
            <>
                <div>
                    <Row>
                        <Col span={12}>
                            <Search
                                placeholder="Typing the word which you want to search!"
                                size="large"
                                enterButton="Search"
                                onSearch={value => console.log(value)}
                               />
                        </Col>
                        <Col span={12} style={{textAlign:"right"}} ><Button type="primary"    size="large">Add New</Button></Col>

                    </Row>
                    <Beam></Beam>
                </div>
                <Table dataSource={createMockData<IWordList>(2,
                    {
                        _id: "10",
                    }
                )} columns={[
                    { title: 'ID', dataIndex: 'age', key: 'age' },
                    { title: 'Word', dataIndex: 'Word', key: 'Word' },
                    { title: 'America', dataIndex: 'password', key: 'password' },
                    { title: 'English', dataIndex: 'nickname', key: 'nickname' },
                    { title: 'Image', dataIndex: 'age', key: 'age' },
                ]
                }>
                </Table>
            </>
        )

    }
}

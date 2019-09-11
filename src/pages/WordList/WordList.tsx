import React from "react";
import { IWordList } from "../../types";
import { Table, Input, Button, Row, Col } from 'antd';
import { createMockData, wordList15000 } from "../../commom/monk";
import { Beam } from "../styled";
import { Link } from "react-router-dom";
import { Nav } from "../../commom/nav";

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
                        <Col span={12} style={{ textAlign: "right" }} >
                          <Link to={Nav.addVocabulary.path}> <Button type="primary" size="large">Add New</Button></Link> 
                        </Col>

                    </Row>
                    <Beam></Beam>
                </div>
                <Table dataSource={wordList15000(20)} columns={[
                    // { title: 'ID', dataIndex: 'age', key: 'age' },
                    { title: 'word', dataIndex: 'word', key: 'word' },
                    { title: 'british', dataIndex: 'british', key: 'british' },
                    { title: 'american', dataIndex: 'american', key: 'american' },
                    { title: 'definition', dataIndex: 'definition', key: 'definition' },
                    { title: 'Image', dataIndex: 'age', key: 'age' },
                ]
                }>
                </Table>
            </>
        )

    }
}

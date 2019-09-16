import React from "react";
import { IWordList } from "../../types";
import { Table, Input, Button, Row, Col } from 'antd';
import {  wordList15000 } from "../../commom/monk";
import { Link } from "react-router-dom";
import { Nav } from "../../commom/nav";
import { Beam } from "../../components/styled";

const { Search } = Input;

interface WordListState extends IWordList { }
export default class WordList extends React.Component<any, WordListState> {

    playSound = (record:{sound:string})=>{
        let audio= document.createElement("audio");
        audio.src= record.sound;
        audio.play();
    }
    

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
                <Table dataSource={wordList15000()} columns={[
                    { title: 'Word', dataIndex: 'word', key: 'word' },
                    { title: 'Sound', dataIndex: 'sound', key: 'sound', render:(text ,record,index)=><span onClick={()=>{this.playSound(record)}}>🔊</span> },
                    { title: 'British', dataIndex: 'british', key: 'british' },
                    { title: 'American', dataIndex: 'american', key: 'american' },
                    { title: 'Definition', dataIndex: 'definition', key: 'definition' },
                    { title: 'Image', dataIndex: 'age', key: 'age' },
                ]
                }>
                </Table>
            </>
        )

    }
}

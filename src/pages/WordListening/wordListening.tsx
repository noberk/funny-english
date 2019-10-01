import React, { useState } from "react";
import { Button, Input, Icon } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { guidGenerator } from "../../commom/id";
import { H1, Center } from "../../components/styled";

import "./index.scss";
import { essential4k_2_100 } from "../../data/essential_2";
import { range } from "../../commom/arr";

enum BookNumber {
  ES4000,
  IELTS,
  TOEFL
}

const wordCountArray = [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100];
const wordList = essential4k_2_100.map(item => {
  return { word: item[0], definition: item[3] };
});
const bookList = [
  { name: "📗ES4000", type: BookNumber.ES4000 },
  { name: "📘IELTS", type: BookNumber.IELTS },
  { name: "📙TOEFL", type: BookNumber.TOEFL }
];
const userInput = [];
const WordListenning: React.FC = () => {
  const [wCountArrary, setWCountArray] = useState(wordCountArray); // total count of word will be examed in this page
  const [pickedWordCount, setPickedWordCount] = useState(wordCountArray[0]); // hou many word examer will be picked
  const [filteredWList] = useState(wordList); // This is for testing purpose.
  const [book, setBook] = useState(BookNumber.ES4000); // Which book you are going to study.
  const [cur, setCur] = useState(1); //set which number of card now is displaying.

  const onCardFlip = (e: any) => {
    let pickedCard = Number.parseInt(e.target.name);
    setCur(pickedCard);
  };
  const createPageCard = (number: number) => {
    return range(number);
  };
  const onWordSizeChanged = (e: any) => {
    let pickedCount = Number.parseInt(e.target.name);
    setPickedWordCount(pickedCount);
    setCur(1);
  };
  const onSelectBook = (e: any) => {
    switch (e.target.name) {
      case "0":
        setBook(BookNumber.ES4000);
        break;
      case "1":
        setBook(BookNumber.IELTS);
        break;
      case "2":
        setBook(BookNumber.TOEFL);
        break;
    }
  };
  const toPre=()=>{
    if(cur>1){
       setCur(cur-1)
    }else{
      setCur(pickedWordCount)
    }
  }
  const toNext=()=>{
    if(cur+1> pickedWordCount){
      setCur(1)
    }else{
      setCur(cur+1)
    }
  }

  return (
    <>
      <header id="wordlistenning-header">
        <H1>To select a word book to test your vocabulary</H1>
        <div>
          <h1 className="margintop20"> To Choose your Book </h1>
          <ButtonGroup>
            {bookList.map(bk => (
              <Button
                key={guidGenerator()}
                type={bk.type === book ? "primary" : "default"}
                name={bk.type.toString()}
                onClick={onSelectBook}
              >
                {bk.name}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div>
          <h1 className="margintop20">
            {" "}
            To Set how many words you want to test in this paper.
          </h1>
          <ButtonGroup>
            {wCountArrary.map(count => (
              <Button
                onClick={onWordSizeChanged}
                type={count === pickedWordCount ? "primary" : "default"}
                key={guidGenerator()}
                name={count.toString()}
              >
                {count}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </header>
      <br />
      <Center className="wordlistenning-article">
        <div>🔊 (press key “=” to play sound again)</div>
        <div>
          <Icon type="caret-left" className="wordlistenning-arrow" onClick={toPre} />
          <Input
            className="wordlistenning-input"
            style={{ width: 400, height: 100, fontSize: "3rem" }}
          />
          <Icon type="caret-right" className="wordlistenning-arrow" onClick={toNext} />
        </div>
        <div className="wordlistenning-definition">
          {filteredWList[cur].definition}
        </div>
      </Center>

      <Center className="wordlistenning-pageCard">
        {createPageCard(pickedWordCount).map(i => (
          <Button
            key={guidGenerator()}
            name={i.toString()}
            type={i === cur ? "primary" : "default"}
            onClick={onCardFlip}
          >
            {i}
          </Button>
        ))}
      </Center>

      <Center className="wordlistenning-submit">
        <Button style={{width:"100%"}}>Submit Your Paper</Button>
      </Center>
    </>
  );
};

export default WordListenning;

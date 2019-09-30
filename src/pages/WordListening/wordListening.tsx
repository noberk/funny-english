import React ,{useState} from "react";
import { Button, Input } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { guidGenerator } from "../../commom/id";
import { H1, Center } from "../../components/styled";
 
import "./index.scss"
import { essential4k_2_100 } from "../../data/essential_2";
import { range } from "../../commom/arr";

enum BookNumber{
    ES4000,
    IELTS,
    TOEFL
}

const wordCountArray=[5,10,15,20,25,30,40,50,60,80,100]
const wordList = essential4k_2_100.map(item=>{ return {word:item[0], definition: item[3]}});
const bookList = [
    { name: "📗ES4000" , type: BookNumber.ES4000},
    { name: "📘IELTS" , type: BookNumber.IELTS},
    { name: "📙TOEFL" , type: BookNumber.TOEFL},
]
const WordListenning: React.FC = () => {
    const [wCountArrary,setWCountArray]= useState(wordCountArray)
    const [pickedWordCount,setPickedWordCount] = useState(5);
    const [filteredWList] = useState(wordList.slice(0,10));
    const [book,setBook] = useState(0);
    const createPageCard= (number:number)=>{
          return range(number);
    }
    const onWordSizeChanged= (e: any)=>{
       let pickedCount =  Number.parseInt(e.target.name);
        setPickedWordCount(pickedCount);
    }
  return (
    <>
      <header id="wordlistenning-header">
        <H1>To select a word book to test your vocabulary</H1>
        <div>
         <h1> To Choose your Book </h1>
          <ButtonGroup>
           <Button>📗ES4000</Button>
            <Button >📘IELTS</Button>
            <Button>📙TOEFL</Button>
          </ButtonGroup>
        </div>

        <div>
            <h1>  To Set how many words you want to test in this paper.</h1>
          <ButtonGroup>
            
            {wCountArrary.map(count=> <Button onClick={onWordSizeChanged} key={guidGenerator()} name={count.toString()}>{count}</Button>)}
          </ButtonGroup>
        </div>
      </header>
      <br />
      <Center className="wordlistenning-article">
        <div>
          🔊 (press key = to play sound again)
        </div>
        <div>
          <Input style={{width:400,height:100, fontSize:"3rem"}} />
        </div>
        <div>this is a definition of this word.</div>
      </Center>

      <Center className="wordlistenning-pageCard">
         {createPageCard(pickedWordCount).map(i=><Button key={guidGenerator()}>{i}</Button> )}
      </Center>
    </>
  );
};

export default WordListenning;

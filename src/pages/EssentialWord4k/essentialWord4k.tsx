import React from "react";
import { essential4000_2_1 } from "../../data/essential_2";
import "./index.css";
import { Sound, playSound } from "../../components/common";
import { Button } from "antd";
import { gradientColor } from "../../commom/colors";
import { guidGenerator } from "../../commom/id";

export default class Essential4K extends React.Component<any,any>{
   highlight=(text:string,word:string)=>{
        let startIndex =  text.indexOf(word);
        let start= text.slice(0,startIndex);
        let end= text.slice(startIndex + word.length , text.length);

        console.log(start);
        console.log(end);
    
        return <>{start}<i className="essentialWord4k_highlight">{word}</i>{end}</>;
   }
   render(){
      
       return (
       <div style={{width:1280, margin:"auto"}}>
        <h1 className="essentialWord4k_h1"> 🎊The key Essential words that you have to know🎊</h1>
        <h2>In this series of courses which contains 120 words and four stories below. we hope what you can follow this page to learn step by step. this is a beginning. I will see again!
        </h2>
        <div style={{marginBottom:"1rem"}}>
            {essential4000_2_1.map((item,index)=>
                <Button key={guidGenerator()} onClick={()=>{playSound(item[0])}} size="large" style={{backgroundColor: gradientColor("#7bbfea","#2585a6",essential4000_2_1.length)[index]}} type="primary">
                {item[0]}  &nbsp;
                <Sound   word={item[0]}/>
                </Button>
                )}
        </div>
        <div className="essentialWord4k">
            {essential4000_2_1.map(item=>
                <div key={guidGenerator()}>
                <div>
                    <span className="img3" >{item[0]} </span>
                    <span>{item[1]} </span>
                    <span>{item[2]} </span>
                     <Sound word={item[0]}/>
                </div>
                <div> {this.highlight(item[3],item[0])}  </div>
                <div style={{marginBottom:"20px"}}>{item[4]} </div>
                </div>
            )}
        </div>
       </div>
       )
       
   }
}
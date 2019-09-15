import React from "react";
import { essential4000_2 } from "../../data/essential_2";
import "./index.css";
import { Sound } from "../../components/common";

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
       <>
        <h1 className="essentialWord4k_h1"> 🎊The key Essential words that you have to know🎊</h1>
        <h2>In this series of courses 
        </h2>
        <div className="essentialWord4k">
            {essential4000_2.map(item=>
                <>
                <div  key={item[0]}>
                    <span className="img3" >{item[0]} </span>
                    <span>{item[1]} </span>
                    <span>{item[2]} </span>
                     <Sound word={item[0]}/>
                </div>
                <div> {this.highlight(item[3],item[0])}  </div>
                <div style={{marginBottom:"20px"}}>{item[4]} </div>
                </>
            )}
        </div>
       </>
       )
       
   }
}
import React from "react";
import { essential4k_2_1, essential4k_article_2 } from "../../data/essential_2";
import "./index.css";
import { Sound, playSound } from "../../components/common";
import { Button } from "antd";
import { gradientColor } from "../../commom/colors";
import { guidGenerator } from "../../commom/id";
import { CenterTitle, CenterParagraph } from "../../components/styled";

export default class Essential4K extends React.Component<any,any>{
   highlight=(text:string,word:string)=>{
        let words= text.split(" ");
       return words.map(w=> w.toUpperCase().includes(word.toUpperCase())?  <s key={guidGenerator()}>{w} </s>:<i key={guidGenerator()}>{w} </i>);
   }
   highLightArticle= (paragraph:string, plainWord:string[] =essential4k_2_1.map(item => item[0])) =>{

       let words= paragraph.split(" ");
       let arr=[];
       return words.map( w=> {
        console.log(w.toString())
        console.log(plainWord.toString()) 
        words.forEach(w=>{
            plainWord.forEach(pw=>{
                 if(w!==" " && w!==""){
                     if(w.includes(pw)){
                         arr.push(<s key={guidGenerator()}>{w} </s>);
                     }else{
                        arr.push(<i key={guidGenerator()}>{w} </i>);
                     }
                 }
            })
        })
     
       }
        );
       return arr;
   }
   render(){
      
       return (
       <div style={{width:1280, margin:"auto"}}>
        <h1 className="essentialWord4k_h1"> 🎊The key Essential words that you have to know🎊</h1>
        <h2>In this series of courses which contains 100 words and four stories below. we hope what you can follow this page to learn step by step. this is a beginning. I will see again!
        </h2>
        {/* here is words button list */}
        <div style={{marginBottom:"1rem"}}>
            {essential4k_2_1.map((item,index)=>
                <Button key={guidGenerator()} onClick={()=>{playSound(item[0])}} size="large" style={{backgroundColor: gradientColor("#7bbfea","#2585a6",essential4k_2_1.length)[index]}} type="primary">
                {item[0]}  &nbsp;
                <Sound   word={item[0]}/>
                </Button>
                )}
        </div>

        {/* here is definition of word list */}
        <div className="essentialWord4k">
            {essential4k_2_1.map(item=>
                <div key={guidGenerator()}>
                <div>
                    <span className="img3" >{item[0]} </span>
                    <span>{item[1]} </span>
                    <span>{item[2]} </span>
                     <Sound word={item[0]}/>
                </div>
                <div className="essentialWord4k_highlight"> {this.highlight(item[3],item[0])}  </div>
                <div style={{marginBottom:"20px"}}>{item[4]} </div>
                </div>
            )}
        </div>

        {/* <div>
            {
                essential4k_article_2.map(article=>
                    <div key={guidGenerator()}>
                       <CenterTitle style={{fontSize: "2rem"}}>{article[0]}</CenterTitle>
                        <article  >
                            {article[1].map(paragraph=> <CenterParagraph key={guidGenerator()}>{paragraph}</CenterParagraph> )}
                        </article>
                    </div>
                )
            }
        </div> */}
       </div>
       )
       
   }
}
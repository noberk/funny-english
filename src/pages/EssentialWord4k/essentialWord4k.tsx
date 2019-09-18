import React from "react";
import {TWordList} from "../../data/essential_2";
import "./index.css";
import { Sound, playSound } from "../../components/common";
import { Button } from "antd";
import { gradientColor } from "../../commom/colors";
import { guidGenerator } from "../../commom/id";
import { Link } from "react-router-dom";
import * as _ from 'lodash';
import "../../animation/DynamicPointMesh/dynPointMesh";
import "../../animation/DynamicPointMesh/dynPointMesh.css"
import { MeshRun } from "../../animation/DynamicPointMesh/dynPointMesh";


const Level: any = {
  1: ["#7bbfea", "#2585a6", "#40a9ff"], //iceberg  🥶
  2: ["#ffcb52", "#ff7b02", "#da7c14"], //sweet orange 🍊
  3: ["#c165dd", "#5c27f1", "#7a21b9"], //mistery purple
  4: ["#2afeb7", "#08c792", "#28a98d"], //mistery purple
  5: ["#5581f1", "#1153fc", "#295bda"], //mistery purple
  6: ["#facd68", "#fc76b3", "#786388"], //mistery purple
  7: ["#00f7a7", "#04f5ed", "#05c184"], //mistery purple
  8: ["#1de5e2", "#b588f7", "#7a21b9"], //mistery purple
  9: ["#ffe324", "#ffb553", "#bd8c2d"] //mistery purple
};
const LevelLength = Object.getOwnPropertyNames(Level).length;
interface IEssential4KState{
data :TWordList;
intId:number;
linkButtonCount : number[];
}
interface IEssential4KProps{
 pageSize :number
 match?:any
}
export default class Essential4K extends React.Component<IEssential4KProps, IEssential4KState> {
  static defaultProps ={
    pageSize :100
  }
  constructor(props:any){
    super(props)
    this.state={
      data : [],
      intId:1,
      linkButtonCount:[]
    }
     
  }
  componentDidMount= async ()=>{
    MeshRun();

    let id: string = this.props.match.params.id;
    let intId = Number.parseInt(id);
    if (Number.isNaN(intId) || intId > 9) intId = 1;
    const ess =await import("../../data/essential_2");

    let lbCount = ess.essential4k.length/this.props.pageSize;
    let lbCountArr:number[]=[];
    console.log(lbCount);
    
    for (let i = 1; i <= lbCount; i++) {
       lbCountArr.push(i);
    }
    this.setState({linkButtonCount: lbCountArr,data: _.cloneDeep(ess.essential4k).splice(0,this.props.pageSize) })
    console.log("componentDidMount");
    
  } 
 
  highlight = (text: string, word: string) => {
    let words = text.split(" ");
    return words.map(w =>
      w.toUpperCase().includes(word.toUpperCase()) ? (
        <s key={guidGenerator()}>{w} </s>
      ) : (
        <i key={guidGenerator()}>{w} </i>
      )
    );
  };
  highLightArticle = (paragraph: string, plainWord: string[]) => {
    let words = paragraph.split(" ");
    let arr = [];
    return words.map(w => {
      console.log(w.toString());
      console.log(plainWord.toString());
      words.forEach(w => {
        plainWord.forEach(pw => {
          if (w !== " " && w !== "") {
            if (w.includes(pw)) {
              arr.push(<s key={guidGenerator()}>{w} </s>);
            } else {
              arr.push(<i key={guidGenerator()}>{w} </i>);
            }
          }
        });
      });
    });
    return arr;
  };
  loadword=async (page:number)=>{
    
    const ess =await import("../../data/essential_2");
    this.setState({data :   _.cloneDeep(ess.essential4k).splice((page-1)*this.props.pageSize,this.props.pageSize), intId: page});
    // console.log(ess.essential4k.length);
    
    // eval(
    //   `const {essential4k_2_${page}00} = ess;
    //   this.setState({data : essential4k_2_${page}00 , intId: ${page}});  
    //   `  
    // );
  }
  
  render() {
    let { data ,intId,linkButtonCount } = this.state;
 

    return (
      <div className="essentialWord4k_container">
        <canvas id="canvas"></canvas>
          <div className="essentialWord4k_aside">
            <h1>Word List 4000</h1>
            <div style={{ boxSizing: "border-box" }}>
              {linkButtonCount.map(item => (
                <div key={guidGenerator()} className="box shadow">
                  <Link to={`./${item}`}  onClick={()=>{this.loadword(item)}} >
                    {(item - 1) * 100 + 1}~{item * 100}
                  </Link>
                  <div className="circle"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="essentialWord4k_right">
            <h1 className="essentialWord4k_h1">
              {" "}
              🎊The key Essential words that you have to know🎊
            </h1>
            <h2>
              In this series of courses which contains 100 words and four
              stories below. We hope what you can follow this page to learn step
              by step. this is a beginning. I will see again!
            </h2>
            {/* here is words button list */}
            <div style={{ marginBottom: "1rem" }}>
              {data.map((item, index) => (
                <Button
                  key={guidGenerator()}
                  onClick={() => {
                    playSound(item[0]);
                  }}
                  size="large"
                  style={{
                    borderColor: `${Level[intId%LevelLength+1][2]}`,
                    backgroundColor: gradientColor(
                      Level[intId%LevelLength+1],
                      data.length
                    )[index]
                  }}
                  type="primary"
                >
                  {item[0]} &nbsp;
                  <Sound word={item[0]} />
                </Button>
              ))}
            </div>

            {/* here is definition of word list */}
            <div className="essentialWord4k">
              {data.map(item => (
                <div key={guidGenerator()}>
                  <div>
                    <span className="img3">{item[0]} </span>
                    <span>{item[1]} </span>
                    <span>{item[2]} </span>
                    <Sound word={item[0]} />
                  </div>
                  <div className="essentialWord4k_highlight">
                    {" "}
                    {this.highlight(item[3], item[0])}{" "}
                  </div>
                  <div style={{ marginBottom: "20px" }}>{item[4]} </div>
                </div>
              ))}
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
        
      </div>
    );
  }
}

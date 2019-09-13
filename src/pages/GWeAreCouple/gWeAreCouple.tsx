import React from "react";
import { Main } from "../../games/WeAreCouple/main";
import { Option } from "../../games/WeAreCouple/option";
import "./index.css";

const eleId=  Option.canvasId
const audioId=Option.audioId;
export default class GWeAreCouple extends React.Component<any,any>{
    render=()=> <div id={eleId}><audio id={audioId} autoPlay={false}/></div>
    componentDidMount(){
        if(document.getElementById(eleId)){
             new Main(Option.diff);
              //  let data = randomPickWords(10);
            //  console.log(data)
            //  new Main(Option.diff,data);
        }
    }
}
 
   

 

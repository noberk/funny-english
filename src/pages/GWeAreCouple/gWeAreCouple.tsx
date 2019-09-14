import React from "react";
import { Main } from "../../games/WeAreCouple/main";
import { Option } from "../../games/WeAreCouple/option";
import "./index.css";
import { randomPickWords,wordList15000 } from "../../commom/monk";


export default class GWeAreCouple extends React.Component<any,any>{

    render=()=> <div style={{width:"80%", height:"80%"}} id={Option.canvasId}><audio id={Option.audioId} autoPlay={false}/></div>
    componentDidMount(){
        if(document.getElementById(Option.canvasId)){

            let data = randomPickWords(15);
            new Main(Option.diff,data);
        }
    }
}
 
   

 

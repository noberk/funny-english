import React from "react";
import { essential4000_2 } from "../../data/essential_2";
import "./index.css";
import { Sound } from "../../components/common";

export default class Essential4K extends React.Component<any,any>{
   render(){
       return (
       <>
       
        <div className="essentialWord4k">
            {essential4000_2.map(item=>
                <>
                <div key={item[0]}>
                    <span>{item[0]} </span>
                    <span>{item[1]} </span>
                    <span>{item[2]} </span>
                     <Sound word={item[0]}/>
                </div>
                <div>{item[3]} </div>
                <div style={{marginBottom:"20px"}}>{item[4]} </div>
                </>
            )}
        </div>
       </>
       )
       
   }
}
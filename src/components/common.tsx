import React from "react";

const playSound = (word:string="yes")=>{
    let audio= document.createElement("audio");
    audio.src=  'http://dict.youdao.com/dictvoice?audio='+word;
    audio.play();
}


export const Sound: React.FC<{word:string}> = props =><span onClick={()=>{playSound(props.word)}}>🔊</span> 

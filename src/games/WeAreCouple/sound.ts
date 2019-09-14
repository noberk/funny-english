import {Option} from "./option";
 

export const MoveSound ='./audio/updown.mp3';
export class Sound {
   // static move= ()=> new Audio(MoveSound).play();
   playSound = ()=>{
      let audio= document.createElement("audio");
      audio.src= MoveSound;
      audio.play();
  }
   playAudio =  (word="yes") =>{
        let audio= document.createElement("audio");
        audio.src=  'http://dict.youdao.com/dictvoice?audio='+ word;
        audio.play()
     }
   
}

 


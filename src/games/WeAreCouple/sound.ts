import {Option} from "./option";
import { async } from "q";

export const MoveSound ='./audio/updown.mp3';
export class Sound {
   // static move= ()=> new Audio(MoveSound).play();
   playSound = ()=>{
      let audio= document.createElement("audio");
      audio.src= MoveSound;
      audio.play();
  }
   playAudio =  () =>{
       let ad=  (document.getElementById(Option.audioId) as HTMLAudioElement);
       ad.src= MoveSound;
      ad.play()
     }
   
}

 


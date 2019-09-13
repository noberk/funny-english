import {RawData} from "../data/wordlist";
import {en,mei} from "./reg"
import { randomRangeIndexs } from "./arr";
export const createMockData= <T extends object|any>(time:number,entity:T)=>{
    const arr : T[]= [];
    for (let i = 0; i < time; i++)    
    {
        let newEntity = JSON.parse(JSON.stringify(entity));
        for (const key in newEntity) {
            if (newEntity.hasOwnProperty(key)) {
                if(key!=="key"){
                    newEntity[key] = `${newEntity[key]}${i}`;
            }
                else{
                    newEntity[key] =  i;
                   
                }
            }
        }
        arr.push(newEntity);
    }
     
    return arr;
}
export type WordRowNames ={word:string,definition:string,british:string,american:string,sound:string};
export const wordList15000=(count:number,rawData:any =RawData)=>{
    let i =0;
    const arr : WordRowNames[]=[];
    for (const it in rawData) {
        let word=  rawData[it].word;
        let sound = 'http://dict.youdao.com/dictvoice?audio='+ word;
          let definition=  rawData[it].definition;
          let british = (en.exec(definition)) as unknown as string
          let american =  mei.exec(definition) as unknown as string
         arr.push({word,definition,british,american,sound})
        if(i>count)
        break;
    }
    return arr;
}

export const randomPickWords=(count:number,rawData:any =RawData)=>{
    let i =0;
    const arr : WordRowNames[]=[];
    for (const it in rawData) {
        let word=  rawData[it].word;
        let sound = 'http://dict.youdao.com/dictvoice?audio='+ word;
          let definition=  rawData[it].definition;
          let british = (en.exec(definition)) as unknown as string
          let american =  mei.exec(definition) as unknown as string
         arr.push({word,definition,british,american,sound})
        break;
    }
    let wordIndexOfRawData= randomRangeIndexs(10,i);
    return wordIndexOfRawData.map(index=> arr[index] );
}


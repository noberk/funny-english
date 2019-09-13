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
    for (const it in RawData) {
        let word=  rawData[it].word;
        let sound = 'http://dict.youdao.com/dictvoice?audio='+ word;
          let definition = rawData[it].definition;
          let british = (en.exec(definition)) as unknown as string
          let american =  mei.exec(definition) as unknown as string
         arr.push({word,definition,british,american,sound})
         i++;
        if(i>=count)
        break;
    }
    return arr;
}


export const randomPickWords=(count:number)=>{
    let words=15000
    const rawData= wordList15000(words);
    const indexs :number[]=[];
    for (let i = 0; i < count; i++) {
        let x= Math.round((Math.random()*10000))+1
       indexs.push(x);
    }
    console.log(indexs);
    
    
    
    return indexs.map(i=>rawData[i]);
    
}
const range= (range:number,count:number)=>{
    // var res: string[] = [];
    // while (res.length===count) {
        
    // }
}


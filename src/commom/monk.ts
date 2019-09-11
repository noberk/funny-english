import {RawData} from "../data/wordlist";
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
export const wordList15000=(count:number,rawData:any =RawData)=>{
    let i =0;
    const arr : {word:string,definition:string}[]=[]
    for (const it in rawData) {
          let word=  rawData[it].word;
          let definition=  rawData[it].definition;
         arr.push({word,definition})
        if(i>count)
        break;
    }
    return arr;
}

 


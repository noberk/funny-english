import {RawData} from "../data/wordlist";
import {en,mei} from "./reg"
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
export const wordList15000=(count:number=2**16,rawData:any =RawData)=>{
    let i =0;
    const arr : WordRowNames[]=[];
    for (const it in RawData) {
        let word=  rawData[it].word;
        let sound = 'http://dict.youdao.com/dictvoice?audio='+ word;
        let definition = rawData[it].definition;
        let british =  en.exec(definition) as unknown as string
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


/**
 *  this function is for ietls data convertion
 * @param s 
 */
export const decompose = (s: string) => {
    let res: string[] = [];
    s.split("\n").forEach(line => {
      if (line.length > 1) {
        res.push(line);
      }
    });
    let arr = [];
    for (let i = 0; i < res.length / 3; i++) {
      arr.push(res.slice(i * 3, (i + 1) * 3));
    }
    let Obj = [];
    for (let i = 0; i < arr.length; i++) {
      let wordObj: any = Object.create(null);
      Obj.push(wordObj);
      wordObj.word = arr[i][0];
      if (arr[i][1].includes("Syn.")) {
        let cixingAndSyn = arr[i][1].split("Syn.");
        wordObj.attr = convertAttr(cixingAndSyn[0].trim());
        if (cixingAndSyn[1].includes(";")) {
          wordObj.syn = cixingAndSyn[1].split(";").map(i => i.trim());
        } else {
          wordObj.syn = [];
          wordObj.syn.push(cixingAndSyn[1]);
        }
      } else {
        wordObj.attr = convertAttr(arr[i][1].trim());
        wordObj.syn = [];
      }
      if (arr[i][2].includes(";")) {
        wordObj.definition = arr[i][2].split(";").map(i => i.trim());
      } else {
        wordObj.definition = [];
        wordObj.definition.push(arr[i][2]);
      }
    }

    return Obj;
  };
  export const convertAttr = (attr: string) => {
    switch (attr) {
      case "n.":
        return "noun";
      case "a.":
        return "adj";
      case "ad.":
        return "adv";
      case "v.":
        return "verb";
      default:
        return attr;
    }
  };
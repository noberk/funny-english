export interface _id{
    _id?:string
}
export interface IStudent extends _id{
    key?:number;
    account:string
    password:string
    nickname:string
    age:number
    job:string
    hobby:string
    phone:number
}
export interface IAddVocabulary extends _id{
    /**The name of this vocabulary */
    word:string
    /**The meaning of this vocab */
    definition?:string
    /**accent from usa */
    pronunciationAmerica?:string
    /**accent from british */
    pronunciationEnglish?:string
    /** network or local path of this word sound */
    sound?:string
    /** base64 type string of this Image */
    base64PNG?:string[]
    /** base64 type string of this Image */
    base64JPG?:string[]
    syn?: string[]
    v?:string
    n?:string
    vt?:string
    vi?:string
    adj?:string
    adv?:string

}
export interface ISentence extends _id{
    sentence:string
}
    
export interface IWordList extends _id{
     
}

export interface RootState{
    balance:number;
}
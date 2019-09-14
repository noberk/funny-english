import Koa from 'koa';
import  favicon from "koa-favicon";
import {  DBConnetion } from "./db";
import { createConnection } from 'typeorm';
import "reflect-metadata";
import {  wordList15000} from "../commom/monk";
import { ignoreFavicon } from '../commom/prevent';
const app = new Koa();
let db = new DBConnetion("word");
app.context.database = db;


app.use(favicon(__dirname + 'favicon.ico'));
// response
app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // db.insert<IStudent>({ nickname: "anYlsj", account: "wer", password: "123", age: 5, job: "我", hobby: "weew" });
   
    // let st= await db.findAll<IStudent>();
    let data= wordList15000();
    for (const it in data) {
        if(data[it].british !== undefined && Array.isArray(data[it].british)){
            data[it].british = data[it].british[0];
        }
        if(data[it].american !== undefined && Array.isArray(data[it].american)){
            data[it].american = data[it].american[0];
        }
    }
    
    let st= await db.insertMany(data);
    console.log(`Request received ${Date.now()}`);
    ctx.body=st.result;
 
});

app.listen(3333);
console.log("Koa server is running!");
console.log("http://localhost:3333");
export { };
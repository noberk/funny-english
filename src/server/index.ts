import Koa from 'koa';
import { Tables } from "./db";
import { Student } from "../types";


const app = new Koa();

// let db = new DBConnetion("student");
// response
app.use(ctx => {
    // ctx.body = db.findAll<Student>().toString();
    ctx.body = Tables.Student;
});

app.listen(3333);
console.log("Koa server is running!");
export { };
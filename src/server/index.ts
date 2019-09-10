import Application from "koa";
const Koa: typeof Application = require('koa');
const app = new Koa();

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(3333);
console.log("Koa server is running!");
export { };
import { MongoClient, MongoError } from "mongodb";
import { Student } from "../types";
type Action = (mongoClient: MongoClient) => void;

class DBConnetion {
    private url = "mongodb://localhost:27017";
    private db = "admin";
    private client: typeof MongoClient = require("mongodb").MongoClient;
    er = (e: MongoError) => { if (e) { console.error(e.message) } }
    open(action: Action) {
        this.client.connect(this.url, { useNewUrlParser: true }, (e, r) => {
            if (e) {
                console.error(e.message);
            }
            action(r)
            r.close();
        })
    }
    test(): boolean {
        let success = false;
        this.client.connect(this.url, { useNewUrlParser: true }, (e, r) => {
            if (e) {
                console.log(e.message);
            }
            r.close();
            success = true;
        })
        return success;
    }
    add<T>(table: string, obj: T): void {
        this.open(mongoClient => {
            let dbo = mongoClient.db(this.db);
            dbo.collection(table).insertOne(obj, (e, r) => {
                this.er(e);
                console.log("文档插入成功");
                mongoClient.close();
            })
        })
    }
}

new DBConnetion().add<Student>("student", { nickname: "王12321312", account: "wer", password: "123", age: 5, job: "我", hobby: "weew" });

// client.connect(url, { useNewUrlParser: true }, function (err: any, db: any) {
//     if (err) throw err;
//     var dbo = db.db("admin");
//     dbo.collection("student").find({}).toArray(function (err: any, result: any) { // 返回集合中所有数据
//         console.log(result);
//         db.close();
//     });
// });

export { }
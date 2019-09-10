import { MongoClient, MongoError } from "mongodb";
import { Student } from "../types";

const Tables = {
    Student: "student",

}

type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }

type Action = (mongoClient: MongoClient) => void;

class DBConnetion {
    constructor(public tableName: string) {

    }
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
    insert<T>(obj: T): void {
        this.open(mongoClient => {
            let dbo = mongoClient.db(this.db);
            dbo.collection(this.tableName).insertOne(obj, (e, r) => {
                this.er(e);
                console.log(" 😄📦 A record has been inserted");
                mongoClient.close();
            })
        })
    }
    delete<T>(whereStr: Partial<T>) {
        this.open(mongoClient => {
            let dbo = mongoClient.db(this.db);
            dbo.collection(this.tableName).deleteOne(whereStr, (e, r) => {
                this.er(e);
                console.log("🔖A record has been deleted");
            })
            mongoClient.close();
        })
    }
    findAll<T>() {
        this.open(mongoClient => {
            let dbo = mongoClient.db(this.db);;
            dbo.collection(this.tableName).find<T>({}).toArray((e, r) => {
                this.er(e);
                return r;
            });
        })
    }
}

const db = new DBConnetion(Tables.Student);
// db.insert<Student>({ nickname: "anYlsj", account: "wer", password: "123", age: 5, job: "我", hobby: "weew" });
// db.delete({ age: 5 });
db.findAll<Student>();
export { }


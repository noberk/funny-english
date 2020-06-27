import { MongoClient, MongoError, InsertWriteOpResult } from "mongodb";



type TableName = "student" | "word";
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
type Action = (mongoClient: MongoClient) => void;


export const Tables = { Student: "student" }
export class DBConnetion {
    constructor(public tableName: TableName) {

    }
    private url = "mongodb://localhost:27017";
    private db = "admin";
    private client: typeof MongoClient = require("mongodb").MongoClient;
    er = (e: MongoError) => { if (e) { console.error(e.message) } }
    /**
     * This function will help you to open and close the connection automatically when you have been operated.
     * @param action 
     */
    open(action: Action) {
        this.client.connect(this.url, { useNewUrlParser: true }, (e, r) => {
            if (e) {
                console.error(e.message);
            }
            action(r)
            r.close();
        })
    }


    insert<T>(obj: T): void {
        this.open(mongoClient => {
            let dbo = mongoClient.db(this.db);
            dbo.collection(this.tableName).insertOne(obj, (e, r) => {
                this.er(e);
                console.log(" 😄📦 A record has been inserted");
            })
        })
    }
    insertMany<T>(many: Array<T>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.open(mongoClient => {
                let dbo = mongoClient.db(this.db);
                dbo.collection(this.tableName).insertMany(many, (e, r) => {
                    this.er(e);
                    resolve(r);
                })
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
        })
    }
    findAll<T>(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.open(mongoClient => {
                let dbo = mongoClient.db(this.db);
                dbo.collection(this.tableName).find<T>({}).toArray((e, r) => {
                    this.er(e);
                    resolve(r);
                });
            })
        })
    }
}


// db.insert<Student>({ nickname: "anYlsj", account: "wer", password: "123", age: 5, job: "我", hobby: "weew" });
// db.delete({ age: 5 });

export { }


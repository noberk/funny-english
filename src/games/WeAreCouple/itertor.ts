interface IEnumerator<T> {
    MoveNext: () => boolean;
    current: T;
}
interface IEnumerable<T> {
    GetEnumerator: () => Collection<T>
}
interface Person {
    name: string;
    age: number;
}
class Collection<T> implements IEnumerator<T> {
    private position: number = -1
    constructor(private list: T[] = []) { }
    MoveNext(): boolean {
        if (this.position < this.list.length - 1) {
            this.position++;
            return true;
        }
        else
            return false;
    }
    get current(): T {
        if (this.position == -1) {
            throw "錯誤";
        }
        if (this.position >= this.list.length) {
            throw "錯誤";
        }
        return this.list[this.position];
    }
}
class Enumerable<T> implements IEnumerable<T> {

    private collection: Collection<T> = new Collection<T>();
    constructor(list: T[]) {
        this.collection = new Collection(list);
    }
    GetEnumerator() {
        return this.collection;
    }
}

var company = new Enumerable<Person>([{ name: "lee", age: 12 }, { name: "ham", age: 44 }, { name: "woz", age: 22 }]);

var persons = company.GetEnumerator();

while (persons.MoveNext()) {
    console.log(`${persons.current.name} ${persons.current.age}`);
}
export {}
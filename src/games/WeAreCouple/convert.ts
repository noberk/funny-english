export function convertD2<T>(cur: T[], rows: number): T[][] {
    let table = new Array<Array<T>>(rows);

    let array: T[] = [];
    for (let i = 0, k = -1; i < cur.length; i++) {
        if (i % rows == 0) {
            array = [];
            k++
        }
        array.push(cur[i]);
        table[k] = array;
    }
    return table
}
export function convertD1<T>(cur: T[][]): T[] {

    var rows = cur.length;
    var cols = cur[0].length
    var result: T[] = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cur[i].length; j++) {
            result.push(cur[i][j]);
        }
    }
    return result;
}
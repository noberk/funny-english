export function randomRangeIndexs(count: number, maxRangeValue: number): number[] {

    if (count < 1) {
        throw "參數錯誤 至少生成一個";
    }
    var reuslt: number[] = [];
    while (reuslt.length != count) {
        var index = randomNum(maxRangeValue);

        var exist = reuslt.filter(p => p === index).length != 0
        if (!exist) {
            reuslt.push(index)
        }
    }
    return reuslt;
}
export function randomNum(n: number): number {
    return Math.floor(Math.random() * n);
}
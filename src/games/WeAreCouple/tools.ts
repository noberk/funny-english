import { Tile, TileInfo } from "./types";
import * as  System from "./types";
import { Option } from "./option";
import { GCC } from "./main";


export function value2emoji(score: number): string {

    //
    switch (score) {
        case 0: return "";
        case 2 ** 1: return Option.emoji.dog
        case 2 ** 2: return Option.emoji.monkey
        case 2 ** 3: return Option.emoji.mouse
        case 2 ** 4: return Option.emoji.piggy
        case 2 ** 5: return Option.emoji.tiger
        case 2 ** 6: return Option.emoji.caty
        case 2 ** 7: return Option.emoji.Monocerus
        case 2 ** 8: return Option.emoji.snake
        case 2 ** 9: return Option.emoji.bee
        case 2 ** 10: return Option.emoji.panda
        default: return Option.emoji.default
    }

}
export function value2word(score: number): string {

    switch (score) {
        case 0: return "";
        case 2 ** 1: return GCC.data[0].word
        case 2 ** 2: return GCC.data[1].word
        case 2 ** 3: return GCC.data[2].word
        case 2 ** 4: return GCC.data[3].word
        case 2 ** 5: return GCC.data[4].word
        case 2 ** 6: return GCC.data[5].word
        case 2 ** 7: return GCC.data[6].word
        case 2 ** 8: return GCC.data[7].word
        case 2 ** 9: return GCC.data[8].word
        case 2 ** 10: return GCC.data[9].word
        default: return Option.emoji.default
    }
}
export function toPath(filename: string, path: string): System.Path {
    return Object.assign(filename, { __pathBrand: path });
}

export function randomNum(n: number): number {
    return Math.floor(Math.random() * n);
}
export function randomRangeIndexs(count: number, maxRangeValue: number): number[] {

    if (count < 1) {
        console.error("參數錯誤 至少生成一個")
    }
    var reuslt: number[] = [];
    while (reuslt.length !== count) {
        var index = randomNum(maxRangeValue);

        var exist = reuslt.filter(p => p === index).length !== 0
        if (!exist) {
            reuslt.push(index)
        }
    }
    return reuslt;


}
export function digitCounts(k: number, n: number) {
    if (k === 0 && n === 0) return 1;

    let arr = [], count = 0;

    if (n > 0) arr.push(0)

    for (let i = 1; i <= n; i++) { arr.push(i) }

    for (let i = 0; i <= n; i++) {
        let nString = arr[i].toString();
        for (let nlen = 0; nlen <= nString.length - 1; nlen++) {
            if (k.toString() === nString[nlen]) {
                count++
            }
        }
    }
    return count;
}

export function combinationTiles(tileSquare: Tile[][], dir: System.Direction): Tile[][] {

    if (dir === System.Direction.Right) {
        tileSquare.forEach(tileArray => {
            let isNotComputed = true
            //实现思路 从每一个行最右边依次向最左边拿"元素" 每个拿到的元素会和它自身右边的元素相乘
            for (let i = tileArray.length - 2; i >= 0; i--) {
                //如果元素自身是空 就不管它
                if (tileArray[i].value === 0)
                    continue;

                //元素自动向右移动 直到最右边为止
                let tileIndex = i
                while (tileArray[tileIndex + 1].value === 0 && tileIndex < tileArray.length) {
                    tileArray[tileIndex + 1].value = tileArray[tileIndex].value
                    tileArray[tileIndex].value = 0;
                    tileIndex++
                    if (tileIndex === tileArray.length - 1)
                        break;
                }

                //如果当前的元素和它右边相邻的元素一样 就可以相乘
                if (isNotComputed) {
                    if (tileArray[i].value === tileArray[i + 1].value) {
                        tileArray[i + 1].value **= 2
                        tileArray[i].value = 0
                    }
                    isNotComputed = false
                }

            }
        })
    }
    return tileSquare
}
/**
 * 實現思路 
 * (1) 把每個行的空數據去除 ,保留不為0的數據.
 * (2) 兩兩比對 相同的話存入新的數組  
 * (3) 最後從新數組賦值給老數組 完成計算
 * @param table 
 * @param dir 
 */

export function combineTilesRows(table: TileInfo[][], dir: System.Direction): TileInfo[][] {

    var blankArr = createBlank2DArray(table.length, table[0].length);

    /**有效行 */
    const vaildRow = (cache: TileInfo[]) => {
        for (const tile of tileRowArr) {
            if (tile.value === 0)
                continue;

            pointRecord(tile);
            cache.push(tile);
        }
    }
    //如果是右鍵
    if (dir === System.Direction.Right) {

        var vaildDataCache: TileInfo[] = []; //有效數據值
        var finalCache: TileInfo[] = []; //計算後的值
        for (let t = 0; t < table.length; t++) {
            var tileRowArr = table[t];
            var blankRowArr = blankArr[t];

            vaildRow(vaildDataCache);

            //如果有效數據數組中的數據長度大於0,那麼就無限循環下去
            while (vaildDataCache.length !== 0) {
                var targetIndex: number = vaildDataCache.length - 1 //從右開始
                if (vaildDataCache.length === 1) {
                    finalCache.push(vaildDataCache[targetIndex]);
                    vaildDataCache.pop();
                    break;
                }
                if (vaildDataCache.length >= 2) {
                    var targetRightIndex: number = targetIndex - 1
                    if (vaildDataCache[targetRightIndex].value === vaildDataCache[targetIndex].value) {

                        var target = vaildDataCache[targetRightIndex];
                        target.value = target.value * target.value;
                        finalCache.push(target)

                        vaildDataCache.pop();
                        vaildDataCache.pop();

                        continue;
                    } else {
                        finalCache.push(vaildDataCache[targetIndex]);
                        vaildDataCache.pop();
                    }
                }
            }
            for (let i = blankRowArr.length - 1; i < blankRowArr.length; i--) {
                if (finalCache.length > 0) {
                    var cValue = finalCache.shift();
                    if (cValue != null) {
                        blankRowArr[i] = cValue
                    }
                } else
                    break;
            }

        }
        return blankArr
    }
    //如果是左鍵
    if (dir === System.Direction.Left) {
        var vaildDataCache: TileInfo[] = []; //有效數據值
        var finalCache: TileInfo[] = []; //計算後的值
        for (let t = 0; t < table.length; t++) {
            var tileRowArr = table[t];
            var blankRowArr = blankArr[t];

            vaildRow(vaildDataCache);


            //如果有效數據數組中的數據長度大於0,那麼就無限循環下去
            while (vaildDataCache.length !== 0) {
                var targetIndex: number = 0;  //從左開始
                if (vaildDataCache.length === 1) {
                    finalCache.push(vaildDataCache[targetIndex]);
                    vaildDataCache.shift();
                    break;
                }
                if (vaildDataCache.length >= 2) {
                    var targetRightIndex: number = targetIndex + 1
                    if (vaildDataCache[targetRightIndex].value === vaildDataCache[targetIndex].value) {

                        var target = vaildDataCache[targetRightIndex];
                        target.value = target.value * target.value
                        finalCache.push(target)

                        vaildDataCache.shift();
                        vaildDataCache.shift();

                        continue;
                    } else {
                        finalCache.push(vaildDataCache[targetIndex]);
                        vaildDataCache.shift();
                    }
                }
            }
            for (let i = 0; i < blankRowArr.length; i++) {
                if (finalCache.length > 0) {
                    var cValue = finalCache.shift();
                    if (cValue != null) {
                        blankRowArr[i] = cValue
                    }
                } else
                    break;
            }
        }
    }
    return blankArr;

}

/**保存上一次所在的索引位置 */
export function pointRecord(ti: TileInfo) {
    ti.previousIndex = ti.index;
}
export function combineTilesColumns(table: TileInfo[][], dir: System.Direction): TileInfo[][] {
    var blankArr = createBlank2DArray(table.length, table[0].length);

    const colsLength = table[0].length

    const vaildCol = (colIndex: number, cache: TileInfo[]) => {
        for (let i = 0; i < colsLength; i++) {
            var tile = table[i][colIndex];

            if (tile.value === 0)
                continue;

            pointRecord(tile);
            tile.previousIndex = tile.index;
            cache.push(tile);
        }
    }
    if (dir === System.Direction.Up) {

        for (let c = 0; c < colsLength; c++) {

            var vaildDataCache: TileInfo[] = []; //有效數據值
            var finalCache: TileInfo[] = []; //計算後的值

            // 每一行最右边依次向最左边拿"元素" 
            // 每个拿到的元素会和它自身右边的元素相乘
            vaildCol(c, vaildDataCache);
            //如果有效數據數組中的數據長度大於0,那麼就無限循環下去
            while (vaildDataCache.length !== 0) {
                var targetIndex: number = 0;  //從左開始
                if (vaildDataCache.length === 1) {
                    finalCache.push(vaildDataCache[targetIndex]);
                    vaildDataCache.shift();
                    break;
                }
                if (vaildDataCache.length >= 2) {
                    var targetRightIndex: number = targetIndex + 1
                    if (vaildDataCache[targetRightIndex].value === vaildDataCache[targetIndex].value) {


                        var target = vaildDataCache[targetRightIndex];
                        target.value = target.value * target.value
                        finalCache.push(target)

                        vaildDataCache.shift();
                        vaildDataCache.shift();

                        continue;
                    } else {
                        finalCache.push(vaildDataCache[targetIndex]);
                        vaildDataCache.shift();
                    }
                }
            }
            for (let i = 0; i < finalCache.length; i++) {
                blankArr[i][c] = finalCache[i]
            }
        }
        return blankArr
    }

    if (dir === System.Direction.Down) {
        for (let c = 0; c < colsLength; c++) {

            var vaildDataCache: TileInfo[] = []; //有效數據值
            var finalCache: TileInfo[] = []; //計算後的值

            // 每一行最右边依次向最左边拿"元素" 
            // 每个拿到的元素会和它自身右边的元素相乘
            vaildCol(c, vaildDataCache);
            //如果有效數據數組中的數據長度大於0,那麼就無限循環下去
            while (vaildDataCache.length !== 0) {
                var targetIndex: number = vaildDataCache.length - 1 //從右開始
                if (vaildDataCache.length === 1) {
                    finalCache.push(vaildDataCache[targetIndex]);
                    vaildDataCache.pop();
                    break;
                }
                if (vaildDataCache.length >= 2) {
                    var targetRightIndex: number = targetIndex - 1
                    if (vaildDataCache[targetRightIndex].value === vaildDataCache[targetIndex].value) {

                        var target = vaildDataCache[targetRightIndex];
                        target.value = target.value * target.value
                        finalCache.push(target)

                        vaildDataCache.pop();
                        vaildDataCache.pop();

                        continue;
                    } else {
                        finalCache.push(vaildDataCache[targetIndex]);
                        vaildDataCache.pop();
                    }
                }
            }

            for (let i = colsLength - 1; i < colsLength; i--) {
                if (finalCache.length > 0) {
                    var cValue = finalCache.pop();
                    if (cValue != null) {
                        blankArr[i][c] = cValue
                    }
                } else
                    break;
            }
        }
        return blankArr
    }
    return table;
}

/**初始化獎勵的方塊 */
export function initCreateTiles(length: number, count: number, valuesRange: number[] = [2, 4]): TileInfo[] {
    if (count > length)
        count = length;

    let pushCount = 0
    let result: TileInfo[] = [];
    for (let i = 0; i < length; i++) {
        result.push({ index: i, value: 0, isAid: false, previousIndex: undefined, moveSteps: 0 })
    }
    while (pushCount < count) {
        var ranNum = randomNum(length)
        if (result[ranNum].value === 0) {
            result[ranNum].value = valuesRange[ranNum % valuesRange.length]
            pushCount++;
        }
    }
    return result;
}
/**額外獎勵方塊 */
export function aid(data: TileInfo[], count: number = 1): TileInfo[] {
    var emptySolt = data.filter(p => p.value === 0)
    var emptySoltCount = emptySolt.length;

    if (emptySoltCount === 0)
        return data;

    if (emptySoltCount <= count) {
        emptySoltCount = count;
    }


    var vaildIndexs = randomRangeIndexs(count, emptySoltCount);

    for (const index of vaildIndexs) {

        let tile = data[emptySolt[index].index];
        tile.value = Option.initTileValueRange[0];     //未完成 生成隨即範圍
        tile.isAid = true;
        tile.index = index;
        tile.previousIndex = undefined;
    }
    return data;
}

export function initCreateTilesTest() {
    return [4, 4, 4, 0, 2, 2, 4, 4, 2, 2, 2, 2, 4, 2, 4, 4];
}
export function createBlank2DArray(rows: number, cols: number): TileInfo[][] {
    var arr2d = new Array<Array<TileInfo>>(rows);
    for (let i = 0; i < rows; i++) {
        arr2d[i] = new Array<TileInfo>(cols);
        for (let k = 0; k < rows; k++) {
            arr2d[i][k] = Object.create(null)
            arr2d[i][k].value = 0
        }
    }
    return arr2d;
}


export function printInfo<T extends System.Step>() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;
        descriptor.value = (...args: T[]) => {
            let ret: any;
            try {
                ret = method.apply(target, args);
                console.info(args[0].index);
                console.info(args[0].value);
            } catch (error) {
                console.error(` 處理錯誤`);
            }
            return ret;
        }
    }
}


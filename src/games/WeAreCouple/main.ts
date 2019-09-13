import * as  System from "./types";
import { randomNum, initCreateTiles, printInfo } from './tools'
import { Option } from "./option";
import { UserInterface } from "./render";
import { Tile, Size, Step, TileSquare } from "./types";
import { WordRowNames } from "../../commom/monk";

/** Game control center 游戏控制 ! */
export class GCC {
    static data:any[]=[];
    /**画板 */
    static canvas =  document.getElementById(Option.canvasId) as HTMLDivElement
    static readonly stage = document.getElementsByTagName('body')[0] as HTMLBodyElement
    /**画板上内边距 */
    static readonly canvasPaddingTop: number = 0
    /**画板宽度 */
    static readonly canvasWidth: number = Option.resolution.w;
    /**画板高度 */
    static readonly canvasHeight: number = Option.resolution.h;
    /**动画持续时间 */
    static readonly animDuration: number = 100
    /**棋盘格 */
    static tableSize: Size = { rows: 0, columns: 0, count: () => GCC.tableSize.rows * GCC.tableSize.columns }
    static isPlayingAnim: boolean;
    static user: UserBehavior = { inputable: true }
    static history: Step[] = [];
    static curRound = () => GCC.history.length;
    static curRecord = (): Step => {
        if (GCC.history.length > 0) {
            return GCC.history[GCC.history.length - 1];
        } else {
            return Object.create(null) as Step
        }
    }
    score: number = 0;
    // //根据难度计算出的来行数
    // canInput: boolean = true;
    // curInputValue: System.Direction = System.Direction.Nothing;
    // preInputValue: System.Direction = System.Direction.Nothing;
    // historyInputValueList: Array<System.Direction> = new Array<System.Direction>();
    @printInfo<Step>()
    static addRecord(record: Step) {
        record.index = GCC.history.length
        GCC.history.push(record);

    }
}

interface UserBehavior {
    inputable: boolean
}
/**
 * record users behaviour and operation state 
 */
class Player {
    constructor(canvas: HTMLElement) {
        canvas.addEventListener('mouseup', (ev) => {
            console.log('already clicked')
        })
    }
    nextStep = (dir: System.Direction) => {}
    preStep = () => {}
}

/**瓦片*/

export class Main {

    canAnim: boolean = true;
    ui: UserInterface;
    tileSquare: TileSquare;
    cellArray = new Array<Tile>();
    //开局生成随机多少个瓦片
    constructor(difficult: System.Difficult,data?:Array<WordRowNames>) {
        this.setDifficult(difficult);
        let div = document.getElementById(Option.canvasId) as HTMLDivElement
        GCC.canvas = div;
        this.ui = new UserInterface(div);
        this.tileSquare = [];
        this.init();
        this.bindEvent();
    }
    bindEvent() {
        GCC.stage.onkeydown = (e) => { this.ui.move(e) }
        GCC.canvas.onmouseover = this.mouseOver;
    }
    setDifficult(diff: System.Difficult): void {

        const sideLenOfCell: number = 4;
        let finalSideLenOfCell = 4;

        switch (diff) {
            case System.Difficult.Kids:
                finalSideLenOfCell = 3
                break;
            case System.Difficult.Easy:
                finalSideLenOfCell = sideLenOfCell << 1;
                break;
            case System.Difficult.Hard:
                finalSideLenOfCell = sideLenOfCell << 2;
                break;
            case System.Difficult.Expert:
                finalSideLenOfCell = sideLenOfCell << 3;
                break;
            case System.Difficult.Boss:
                finalSideLenOfCell = sideLenOfCell << 4;
            case System.Difficult.Abyss:
                finalSideLenOfCell = 88
                break;
        }
        GCC.tableSize.rows = finalSideLenOfCell;
        GCC.tableSize.columns = finalSideLenOfCell;
    }
    copyTileSquare(source: TileSquare): TileSquare {
        let target = new Array<Array<Tile>>(GCC.tableSize.rows);
        source.forEach(t => {
            var newArray = new Array<Tile>();
            target.push(newArray)
            for (const value of t) {
                newArray.push(value);
            }
        })
        return target;
    }

    toTable(cur: Tile[]): TileSquare {
        let table = new Array<Array<Tile>>(GCC.tableSize.rows);

        let array = new Array<Tile>();
        for (let i = 0, k = -1; i < cur.length; i++) {
            if (i % GCC.tableSize.rows == 0) {
                array = new Array<Tile>();
                k++;
            }
            array.push(cur[i]);
            table[k] = array;
        }
        return table;
    }

    unload(){

    }
    init(): void {

        var initRecord = initCreateTiles(GCC.tableSize.count(), Option.initTileCount, Option.initTileValueRange);
        GCC.addRecord({ value: initRecord, direction: System.Direction.Nothing, index: 0 });
        this.ui.draw(GCC.curRecord().value)
    }
    mouseOver(mouse: MouseEvent): void {
        //   console.log(mouse.x);
    }

    /**
    * 创建随机数字 2 or 4
    */
    createNumber2or4(): number {
        var ran = randomNum(10);
        var beginRan = ran % 2 == 0 ? 2 : 4;
        return beginRan;
    }
}







import { GCC } from './main'
export type Path = string & { __pathBrand: any }
/**
 *  You can choose one of all difficult to start game , each difficult has different cells
 */
export enum Difficult {
    /** has 3 * 3 cells */
    Kids,
    /** has 4 * 4 cells */
    Normal,
    /** has 8 * 8 cells */
    Easy,
    /** has 16 * 16 cells */
    Hard,
    /** has 32 * 32 cells */
    Expert,
    /** has 64 * 64 cells */
    Boss,
    /** has 88 * 88 cells */
    Abyss
}
/**
 * record which direction key has been pressed
 */

export  enum Direction {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Nothing = 0,
    VaildDirection = Left | Up | Right | Down,
}

/**
 *there are some beaufully color  
 */
export  enum AnimationType {
    linear,
    easeIn,
    easeOut,
    easeInOut,
}
export type TileSquare = Array<Array<Tile>>;
export interface Size {
    /** 横向有多少个方块 */
    rows: number;
    /** 竖向有多少个方块   */
    columns: number;
    /** 横向和竖向方块的总数量  */
    count: () => number;
}
export interface Point {
    x: number;
    y: number
}
export interface ArrayCellAttribute<T> {
    index: number;
    value: T;

}
export interface TileInfo extends ArrayCellAttribute<number> {
    moveSteps:number;  //需要移动多少步
    position?: Point;    
    isAid: boolean;
    previousIndex: number | undefined
}
/** history data */
export interface Step {
    direction: Direction;
    index?: number;
    value: TileInfo[];
    
}

export class Tile implements TileInfo {
    moveSteps: number=0
    position?: Point | undefined;
    isAid: boolean = false
    
    previousIndex: number | undefined;
    own: HTMLDivElement = document.createElement('div'); //初始化
    index: number = 0;//索引
    value: number = 0;//数值
    text: string= 'undefined'
    width: number = 0;//tile width
    height: number = 0;//tile height
    borderWidth: number = 0; //tile border width
    borderHeight: number = 0; //tile border height
    top: number = 0;//offset top
    left: number = 0;//offset left

    currentRowIndex(): number {
        return this.index / GCC.tableSize.columns
    }
    currentColIndex(): number {
        return this.index % GCC.tableSize.columns
    }

    isEmpty(): boolean {
        if (this.value === 0)
            return true
        else
            return false
    }
    //更新
    update(): void {
        if (this.own != undefined) {
            if (this.own.style.left)
                this.left = parseInt(this.own.style.left);
            if (this.own.style.top)
                this.top = parseInt(this.own.style.top);
            if (this.own.style.right)
                this.top = parseInt(this.own.style.right);
            if (this.own.style.bottom)
                this.top = parseInt(this.own.style.bottom);
        }
    }
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};
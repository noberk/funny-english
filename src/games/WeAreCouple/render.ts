import { GCC } from './main';
import { ColorPan } from './colors';
import { combineTilesRows, combineTilesColumns, aid, value2emoji, value2word } from "./tools";
import * as  System from "./types";
import { Tile, TileSquare, TileInfo } from "./types";
import { convertD2, convertD1 } from './convert';
import { Sound } from './sound';
import { Option, TileRepresent } from './option';

export class UserInterface {

    private canvasStyle(): void {
        let canvas = document.getElementById(Option.canvasId) as HTMLDivElement;
        canvas.style.width = this.toPx(GCC.canvasWidth)
        canvas.style.height = this.toPx(GCC.canvasHeight)
    }
    private bodyStyle(): void {
        var body:any = document.getElementsByTagName('body').item(0);
        body.style.paddingTop = this.toPx(GCC.canvasPaddingTop);
        body.style.opacity = '0.9';
    }

    private toPx(val: number): string {
        return val + 'px';
    }
    /**
     * 最外层的div容器
     */
    public divCanvas: HTMLDivElement|any;
    constructor(c: HTMLDivElement) {
        this.divCanvas = c;
        console.log(this.divCanvas);
        this.backgroundSkin();
        this.bodyStyle();
        this.canvasStyle();
        this.createBackGroundTail("div");

    }

    private backgroundSkin(): void {
        this.divCanvas.style.backgroundColor = ColorPan.backgroundDivBig;
        this.divCanvas.style.margin = "auto";
        this.divCanvas.style.position = "relative";
        this.divCanvas.style.borderRadius = this.toPx(6)
    }
    private colorfulValue(val: number, defaultValue = 2): string {
        switch (val) {
            case defaultValue << 0: return ColorPan.Lv1;
            case defaultValue << 1: return ColorPan.Lv2;
            case defaultValue << 2: return ColorPan.Lv3;
            case defaultValue << 3: return ColorPan.Lv4;
            case defaultValue << 4: return ColorPan.Lv5;
            case defaultValue << 5: return ColorPan.Lv6;
            case defaultValue << 6: return ColorPan.Lv7;
            case defaultValue << 7: return ColorPan.Lv8;
            case defaultValue << 8: return ColorPan.Lv9;
            default:
                return ColorPan.Default;

        }
    }
    private createBackGroundTail(eleName: string): void {

        let borderWidth = GCC.canvasWidth * (1 / 6);
        let borderHeight =  GCC.canvasHeight * (1 / 6);
        let width = (GCC.canvasWidth - borderWidth) / GCC.tableSize.columns;
        let height = ( GCC.canvasHeight - borderHeight) / GCC.tableSize.rows;
        let pieceOfRectangle = GCC.tableSize.rows * GCC.tableSize.columns;
        let singleborderWidth = borderWidth / (GCC.tableSize.columns + 1);
        let singleborderHeight = borderHeight / (GCC.tableSize.rows + 1);

        for (var i = 0; i < pieceOfRectangle; i++) {

            let element = document.createElement(eleName);
            element.style.width = this.toPx(width);
            element.style.height = this.toPx(height);
            element.style.backgroundColor = ColorPan.backgroundDivSmall;
            element.style.borderRadius = this.toPx(10);
            element.style.position = "absolute";

            let x = ((singleborderWidth + ((singleborderWidth + width) * (i % GCC.tableSize.columns))));
            element.style.left = this.toPx(x);
            let y = singleborderHeight + (singleborderHeight + height) * (Math.floor(i / GCC.tableSize.columns));
            element.style.top = this.toPx(y);

            this.divCanvas.appendChild(element);

        }
    }
    //随机创建一个新的  "格子""

    public update(previous: TileSquare, next: TileSquare): Boolean {
        return true;
    }
    private clear(canvas: HTMLDivElement): boolean {
        try {
            while (canvas.hasChildNodes()) //当div下还存在子节点时 循环继续
            {
                if (canvas.firstChild) {
                    canvas.removeChild(canvas.firstChild);
                }
            }

            this.createBackGroundTail('div')
        } catch (e) {
            return false
        }
        
        return true
    }
    public draw(records: TileInfo[], animation?: boolean) {

        var record2D = convertD2(records, GCC.tableSize.rows);

        var tileSquare = new Array<Array<Tile>>(GCC.tableSize.rows);
        let tab = 0;
        //设置 棋盘格初始化数据
        for (let i = 0; i < GCC.tableSize.rows; i++) {
            let array1 = new Array<Tile>(GCC.tableSize.columns);
            for (var j = 0; j < array1.length; j++) {
                array1[j] = new Tile();
                array1[j].index = tab;
                switch (Option.represent) {
                    case TileRepresent.Emoji:
                        array1[j].text = value2emoji(record2D[i][j].value);    
                        break;
                    case TileRepresent.Digtal:
                            array1[j].value = record2D[i][j].value
                            array1[j].text = record2D[i][j].value.toString()
                            break;
                    case TileRepresent.English:
                            array1[j].text =  value2word(record2D[i][j].value)
                        break;

                }

                tab++;
            }
            tileSquare[i] = array1;
        }

        tileSquare.forEach(element => {
            element.forEach(tile => {
                this.createTile(tile)
                if (animation)
                    this.moveTile2(tile, GCC.curRecord().direction)
            });
        });



    }
    public move(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        if (
            keyCode == System.Direction.Left ||
            keyCode == System.Direction.Up ||
            keyCode == System.Direction.Right ||
            keyCode == System.Direction.Down) {
        } else
            return;



        var preRoundData = Object.assign(GCC.history[GCC.history.length - 1].value, {});
        var d2 = convertD2(preRoundData, GCC.tableSize.rows);

        var newData: TileInfo[] = [];
        var dir: System.Direction = System.Direction.Nothing;
        if (GCC.user.inputable) {
            switch (keyCode) {
                case System.Direction.Left:
                    newData = convertD1(combineTilesRows(d2, System.Direction.Left))
                    dir = System.Direction.Left;
                    break;
                case System.Direction.Up:
                    newData = convertD1(combineTilesColumns(d2, System.Direction.Up))
                    dir = System.Direction.Up;
                    break;
                case System.Direction.Right:
                    newData = convertD1(combineTilesRows(d2, System.Direction.Right))
                    dir = System.Direction.Right;
                    break;
                case System.Direction.Down:
                    newData = convertD1(combineTilesColumns(d2, System.Direction.Down))
                    dir = System.Direction.Down;
                    break;
            }

            newData.forEach((val, i) => { val.index = i; val.isAid=false; })  //重新赋值索引

            var data = aid(newData, Option.tilesCountBouns);
            GCC.addRecord({ value: data, direction: dir });
            this.clear(GCC.canvas);
            //   new Sound().playAudio();
            

            if (GCC.user.inputable) {
                if (Option.animation) {
                    this.draw(GCC.curRecord().value, Option.animation);
                } else {
                    this.draw(GCC.curRecord().value);
                }
            }

        }
    }
    public createTile(tile: Tile, row: number = GCC.tableSize.rows, col: number = GCC.tableSize.columns): HTMLDivElement {
        if (tile == null) {
            console.log("dict is null")
        }

        let index = tile.index;
        let value = tile.value;
        let text = tile.text;

        let color = this.colorfulValue(value);

        let borderWidth = GCC.canvasWidth * (1 / 6);
        let borderHeight = GCC.canvasHeight * (1 / 6);
        let width = (GCC.canvasWidth - borderWidth) / col;
        let height = (GCC.canvasHeight - borderHeight) / row;
        let pieceOfRectangle = row * col;
        let singleborderWidth = borderWidth / (col + 1);
        let singleborderHeight = borderHeight / (row + 1);
        let eleDiv = document.createElement("div");

        eleDiv.style.width = this.toPx(width);
        eleDiv.style.height = this.toPx(height);
        eleDiv.style.backgroundColor = color;
        eleDiv.style.borderRadius = this.toPx(10);
        eleDiv.style.position = "absolute";
        eleDiv.style.lineHeight = this.toPx(height);
        eleDiv.style.textAlign = "center";
        eleDiv.className = 'tile';
        let x = ((singleborderWidth + ((singleborderWidth + width) * (index % col))));
        eleDiv.style.left = this.toPx(x);
        let y = singleborderHeight + (singleborderHeight + height) * (Math.floor(index / col));
        eleDiv.style.top = this.toPx(y);

        tile.own = eleDiv;
        tile.width = width;
        tile.height = height;
        tile.borderWidth = singleborderWidth;
        tile.borderHeight = singleborderHeight;
        tile.left = x;
        tile.top = y;

        var a = document.createElement("a");
        a.style.fontSize = this.toPx(height / 2.5);
        a.innerText = text;
        eleDiv.appendChild(a);
        this.divCanvas.appendChild(eleDiv);

        return eleDiv;
    }
    delay(time: number): Promise<void> {
        return new Promise<void>((resovle, reject) => {
            setTimeout(resovle, time)
        })
    }
    doPromise(action: () => void): Promise<boolean> {
        return new Promise<boolean>((resovle, reject) => {
            try {
                action();
                resovle(true)
            } catch (error) {
                reject(false);
            }
        });
    }
    moveTile2(tile: Tile, dir: System.Direction): void {
        let frameRate: number = 60;

        if (dir != null) {
            if (dir == System.Direction.Left) {

                this.doPromise(
                    async () => {
                        Animation.BeginAnim(0, tile.left, tile.borderWidth - tile.left, frameRate, System.AnimationType.linear, tile.own);
                        await this.delay(GCC.animDuration)
                        tile.update();
                    }
                )
            }
            if (dir == System.Direction.Right) {

                // var tileWidth = tile.width + tile.borderWidth;
                // Animation.BeginAnim(0, tile.left, (tileWidth * (GCC.tableSize.rows - 1)) - (tileWidth * tile.currentColIndex()), frameRate, System.AnimationType.linear, tile.own);
                // setTimeout(() => {
                //     tile.update();
                // }, GCC.animDuration);
            }
        }


    }
    moveTile(tile: Tile, dir: System.Direction): void {
        let frameRate: number = 60;

        if (dir != null) {
            if (dir == System.Direction.Left) {

                Animation.BeginAnim(0, tile.left, tile.borderWidth - tile.left, frameRate, System.AnimationType.linear, tile.own);
                setTimeout(() => {
                    tile.update();
                }, GCC.animDuration);
            }
            if (dir == System.Direction.Right) {

                var tileWidth = tile.width + tile.borderWidth;
                Animation.BeginAnim(0, tile.left, (tileWidth * (GCC.tableSize.rows - 1)) - (tileWidth * tile.currentColIndex()), frameRate, System.AnimationType.linear, tile.own);
                setTimeout(() => {
                    tile.update();
                }, GCC.animDuration);
            }
        }


    }

}

class Animation {
    private static linear(t: number, b: number, c: number, d: number): number {
        return c * t / d + b;
    }
    private static easeIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t + b;
    }
    private static easeOut(t: number, b: number, c: number, d: number): number {
        return -c * (t /= d) * (t - 2) + b;
    }
    private static easeInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    /**
     * 
     * @param currentTime（当前时间）
     * @param beginningValue（初始值） 当前的值 
     * @param ChangeInValue（增量） 坐标100px to 200px  公式200-100=100   100px to 150px  公式150-100= 50
     * @param duration (帧率) t++   t<d   值120 每秒
     * @param animType
     * @param divElement (div元素)
     */
    static BeginAnim(currentTime: number, beginningValue: number, ChangeInValue: number, duration: number, animType: System.AnimationType, divElement: HTMLDivElement): void {

        //var t = 0;
        //var b = parseInt(divElement.style.left);
        //var c = -400;
        //var d = 120;
        var ms = 1000;
        var colseID = setInterval(() => {
            switch (animType) {
                case System.AnimationType.linear:

                    var val = this.linear(currentTime, beginningValue, ChangeInValue, duration);
                    var str;
                    if (currentTime <= duration) {
                        str = val + "px";
                        if (divElement != null) {
                            divElement.style.left = str;
                        }
                    }
                    currentTime++;
                    if (currentTime == duration) {
                        //  divElement.style.left = str;
                    }

                    break;
                case System.AnimationType.easeIn:
                    this.easeIn(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                case System.AnimationType.easeOut:
                    this.easeOut(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                case System.AnimationType.easeInOut:
                    this.easeInOut(currentTime, beginningValue, ChangeInValue, duration);
                    break;
                default:
                    this.linear(currentTime, beginningValue, ChangeInValue, duration);
                    break;
            }

        }, ms / duration);

        setTimeout(() => { clearInterval(colseID); }, ms);
    }
}
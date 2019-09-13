import { randomNum } from "./tools";


const Max = 2 << 7 - 1;

export class ColorPan {
    public static Lv1 = "#FFFFCC";
    public static Lv2 = "#CCFFFF";
    public static Lv3 = "#FFCCCC";
    public static Lv4 = "#FFCC99";
    public static Lv5 = "#CCFF99";
    public static Lv6 = "#C8BFE7";
    public static Lv7 = "#99CC99";
    public static Lv8 = "#FFFFFF";
    public static Lv9 = "#FFFF99";
    public static Lv10 = "#CCCCFF";
    public static Default ="#CCCCCC";
    public static backgroundDivBig = "#b8ac9e";
    public static backgroundDivSmall = "#d5cdc2";
}

export function randomRGB(): string {
    let R = randomNum(Max);
    let G = randomNum(Max);
    let B = randomNum(Max);

    return `RGB(${R},${G},${B})`;
}
export function randomHex(): string {
    let R = randomNum(Max).toString(16);
    let G = randomNum(Max).toString(16);
    let B = randomNum(Max).toString(16);

    return `#${R}${G}${B}`;
}
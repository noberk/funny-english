import {Difficult} from "./types";

export enum TileRepresent{
    Emoji,
    Digtal,
    English
}

export const Option = {
    represent:TileRepresent.English,  //选择游戏的模式
    emojiMode: false,
    animation:false,
    audioId:"7b03258a-18a7-44f6-9087-d4f7f28cdf7b",
    /**元素id */
    canvasId: '429a662c-ffd7-4496-bee7-3e9fbbea443b',
    /**初始化方塊取值範圍 */
    initTileValueRange: [2, 4, 8, 16, 32, 64, 128, 256],
    /**初始化方塊的數量 */
    initTileCount: 1,
    /**初始化方塊的數量 */
    size: { row: 8, col: 8 },
    /**獎勵 */
    scoreBouns: {
        half: 0.5,
        tiny: 1.2,
        double: 2,
        triple: 3,
    },
    emoji: {
        default: `❓`,
        piggy: `🐷`,
        monkey: `🐵`,
        tiger: `🐯`,
        dog: `🐶`,
        mouse: `🐭`,
        caty: ` 🐱`,
        Monocerus: `🦄`,
        bee: `🐝`,
        snake: `🐍`,
        panda: `🐼`,
    },
    /**再下一回合會獎勵方塊的數量 */
    tilesCountBouns: 1,
    /**畫佈的大小 */
    resolution: { 
        w: 1600, h: 900 
    },

    diff:Difficult.Normal,
}
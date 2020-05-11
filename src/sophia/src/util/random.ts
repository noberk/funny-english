
/**
 * Return a random int, used by `random.getUid()`.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Return a unique identifier with the given `length`.
 *
 * @param {Number} length
 * @return {String}
 * @api private
 */
export const getUid = (length: number = 10): string => {
    let uid: string = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength = chars.length;

    for (let i = 0; i < length; ++i) {
        uid += chars[getRandomInt(0, charsLength - 1)];
    }

    return uid;
};

export const randomColor = (transparent: boolean = false) => {
    const range = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let color = `#`
    let len = 6
    if (transparent) len = 8
    for (let i = 0; i < len; i++) {
        color += range[getRandomInt(0, 15)]
    }
    return color
}

export type SceneRegion = "animal" | "tree" | "flora"

export function sceneNameGenerator(type: SceneRegion) {
    let uncertainCollection: string[] = []
    const trees = ['🎄', '🎋', '🎍', '🌵', '🌴', '🌳', '🌲']
    const animals = ['🦄', '🐷', '🐏', '🦒', '🐭', '🐇', '🐼', '🐒', '🦍']
    const flora = ['💐', '🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷']
    switch (type) {
        case 'animal': uncertainCollection = animals
            break
        case 'tree': uncertainCollection = trees
            break
        case 'flora': uncertainCollection = flora
    }


    const emoji = uncertainCollection[getRandomInt(0, uncertainCollection.length - 1)]
    const fullName = `${emoji}${getUid(8)}${emoji}`

    return fullName
}

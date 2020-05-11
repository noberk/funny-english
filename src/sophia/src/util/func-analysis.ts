export function isArrowFunction(fn: Function) {
    let isNonArrowFnRegex = /^\s*function/;
    var isArrowFnWithParensRegex = /^\([^)]*\) *=>/;
    var isArrowFnWithoutParensRegex = /^[^=]*=>/;
    var fnStr = Function.prototype.toString.call(fn);
    return fnStr.length > 0 &&
        !isNonArrowFnRegex.test(fnStr) &&
        (isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr));
};
export function analyzeFuncParams(fn: Function): string[] {
    if (typeof fn === "function") {
        const funcString: string = fn.toString()
        if (isArrowFunction(fn) && !funcString.includes(String.fromCharCode(0x28))) {
            return [funcString.split('=>')[0].trim()]
        }
        let parenthesisL = funcString.indexOf(String.fromCharCode(0x28))
        let parenthesisR = funcString.indexOf(String.fromCharCode(0x29))
        const paramsSeries = funcString.substr(parenthesisL + 1, parenthesisR - parenthesisL - 1)
        if (paramsSeries === "") return []
        return paramsSeries.split(',')
    }
    return []
}
export function recall() {

}


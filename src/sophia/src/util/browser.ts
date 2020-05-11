export function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

export function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

export function EvaluateElementArea(ele: HTMLElement): { width: number, height: number } {
    let width, height = 0
    width = Math.max(
        ele.scrollWidth,
        ele.offsetWidth,
        ele.clientWidth
    )
    height = Math.max(
        ele.scrollHeight,
        ele.offsetHeight,
        ele.clientHeight
    )
    return {
        width,
        height
    }
}
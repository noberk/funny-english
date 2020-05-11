export function debounce(fn: Function, delay: number) {
    let timeoutId: any
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
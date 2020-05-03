export function debounce(fn: Function, delay: number) {
    let timeoutId: number
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
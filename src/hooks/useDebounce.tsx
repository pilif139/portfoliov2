export default function useDebounce() {
    let debounce: NodeJS.Timeout
    const debounced = (callback: () => void, timeout: number = 0) => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
            callback()
        }, timeout)
    }
    return [debounced] as const
}
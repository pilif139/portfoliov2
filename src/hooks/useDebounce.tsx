"use client";

import { useRef } from 'react'

export default function useDebounce() {
    const debouncedRef = useRef<Timer | null>(null)
    const debounced = (callback: () => void, timeout: number = 0) => {
        if (debouncedRef.current) {
            clearTimeout(debouncedRef.current)
        }

        debouncedRef.current = setTimeout(() => {
            callback()
        }, timeout)
    }
    return [debounced] as const
}

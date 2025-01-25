import { useEffect, useRef, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 500, callback?: (value: T) => void) => {
    /**
     * Utility hook that is used to delay the setting of the state of certain value
     * to avoid overwhelming number of requests
     */
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const timeRef = useRef<any>(undefined)

    useEffect(() => {
        timeRef.current = setTimeout(() => {
            setDebouncedValue(value)
            if (callback) {
                callback(value)
            }
        
        }, delay)

        return () => {
            clearTimeout(timeRef.current)
        }
    }, [value, delay])

    return debouncedValue

}
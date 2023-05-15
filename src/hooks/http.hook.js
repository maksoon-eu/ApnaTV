import { useState, useCallback, useRef } from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', headers = {'Content-Type': 'application/json', 'X-API-KEY': 'H8BX044-17Y4H4J-PYP7M79-RXYNX8F', 'Accept': 'application/json'}) => {

    setLoading(true)

    try {
        if (JSON.parse(localStorage.getItem(url))) {
            const data = JSON.parse(localStorage.getItem(url))
            setLoading(false)
            return data
        } else {
            const response = await fetch(url, {method, headers})
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json()
            localStorage.setItem(url, JSON.stringify(data))
            setLoading(false)
            return data
        }
    } catch(e) {

        setLoading(false)
        setError(e.message)
        throw e

    }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}
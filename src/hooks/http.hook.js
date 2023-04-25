import { useState, useCallback } from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', headers = {'Content-Type': 'application/json', 'X-API-KEY': 'H8BX044-17Y4H4J-PYP7M79-RXYNX8F', 'Accept': 'application/json'}) => {
        
    setLoading(true)

    try {
        const response = await fetch(url, {method, headers})

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json()

        setLoading(false)

        return data
    } catch(e) {

        setLoading(false)
        setError(e.message)
        throw e

    }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}
import { useState, useEffect } from 'react'
import { httpGet, httpPost } from 'npc-http'
import { UseRequestType } from './type'
import { EnumAxiosType } from 'npc-http/type'

const useRequest: UseRequestType = (url, defaultParams, method, hook, config) => {
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState(defaultParams)
    const { immediate = true, onSuccess, onError } = hook || {}
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const run = async (newParams?: any) => {
        setLoading(true)
        if (newParams ?? false) {
            setParams(newParams)
        }
        try {
            const result = await (method === EnumAxiosType.post ? httpPost : httpGet)(url, newParams || params, config)
            onSuccess && onSuccess(result, params)
            setData(result)
            setError(null)
        } catch (error) {
            setError(error as any)
            setData(null)
            onError && onError(error, params)
        } finally {
            setLoading(false)
        }
    }

    const refresh = () => {
        run()
    }

    useEffect(() => {
        if (immediate) {
            run()
        }
    }, [])

    return {
        data,
        error,
        params,
        loading,
        run,
        refresh
    }
}

export default useRequest


import { ref, onMounted } from 'vue'
import { httpGet, httpPost } from 'npc-http'
import { UseRequestType } from './type'
import { EnumAxiosType } from 'npc-http/type'

const useRequest: UseRequestType = (url, defaultParams, method, hook, config) => {
    const loading = ref<boolean>(false)
    const params = ref(defaultParams)
    const { immediate = true, onSuccess, onError } = hook || {}
    const data = ref(null)
    const error = ref<any>(null)
    const run = async (newParams?: any) => {
        loading.value = false
        if (newParams ?? false) {
            params.value = newParams
        }
        try {
            const result = await (method === EnumAxiosType.post ? httpPost : httpGet)(url, newParams || params, config)
            onSuccess && onSuccess(result, params)
            data.value = result
            error.value = null
        } catch (err) {
            error.value = (err as any)
            data.value = (null)
            onError && onError(err, params)
        } finally {
            loading.value = false
        }
    }

    const refresh = () => {
        run()
    }

    onMounted(() => {
        if (immediate) {
            run()
        }
    })

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
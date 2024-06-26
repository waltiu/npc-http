import { isPromise } from '../util';
import * as resultInterceptor from './resultInterceptor'
import instance from '..';
import dayjs from 'dayjs'
import { ConfigType } from '../type';

const DEFAULT_CACHE_TIME = 300;


export const getRequestCacheKey = (key: string) => {
    return `request_key_${key}`
}


export const getCacheData = (config:ConfigType) => {
    const { cache, url } = config
    const cacheKey = getRequestCacheKey(cache?.cacheKey || url as string)
    let data = instance.cacheMethod().getItem(cacheKey) as any
    if (data) {
        data = JSON.parse(data)
    }
    if (data && data?.expireTime > dayjs().toString()) {
        return data.data
    } else {
        data = null
    }
    return data
}


export const onResponseFulfilled = (response: any,) => {
    const { cache, url } = response?.config||{}
    if (cache) {
        const cacheKey = getRequestCacheKey(cache.cacheKey || url);
        const cacheTime = cache.cacheTime || DEFAULT_CACHE_TIME;
        const data = resultInterceptor.onFulfilled({
            ...response,
            config:{
                ...response.config,
                errorHandler:()=>{}
            }
        })
        if (!isPromise(data)) {
            instance.cacheMethod().setItem(cacheKey, JSON.stringify({
                data,
                saveTime: dayjs().toString(),
                expireTime: dayjs().add(Number(cacheTime), 'm').toString()
            }));
        }

    }
    return response;
};

export const onResponseRejected = (error: any) => {
    return Promise.reject(error);
};

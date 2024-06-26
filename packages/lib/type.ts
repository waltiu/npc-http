import { AxiosRequestConfig } from "axios"


export enum EnumCache {
    local = "localStorage",
    session = "sessionStorage"
}

export type GlobalConfigType = Partial<
    {
        cacheType: EnumCache,
        message: MessageCallEventMap,
        watchRequestStatus: (isRequesting?: boolean) => void
    }
>

export type RequestConfigType = Partial<
    {
        cache: {
            cacheKey: string,  // 缓存key
            cacheTime: number // 缓存时间
        },
        redirect: {
            code: number,  // 重定向code
            path: string  // 重定向路径
        } | boolean, // 当为true，默认code为500，path为/login
        ignoreLoading: boolean, // 是否忽略全局loading
        ignoreTransferResult: boolean  // 是否忽略结果错误
        errorHandler: (err: any) => void, // 自定义错误处理函数
        transferResult: (data: any) => any  // 自定义处理响应结果
    }>

export type CacheMapType = {
    [key: string]: CacheItemType
}

export type CacheItemType = {
    cacheKey: string,
    data: any,
    expireTime: number
}

export type CustomConfigType = GlobalConfigType & RequestConfigType

export type RequestMethodType = (
    url: string,
    params?: any,
    config?: RequestConfigType
) => Promise<any>

export type JsonpMethodType = (url: string, options?: any) => Promise<any>


export enum EnumAxiosType {
    get = 'get',
    post = 'post',
    postForm = 'postForm'
}

export enum EnumRequestType {
    fetch,
    jsonp,
    axios
}

export type ConfigType = GlobalConfigType & CustomConfigType & AxiosRequestConfig

export type SendRequestType = () => Promise<any>


export type MessageCallEventMap = Partial<
    {
        success: (data: any) => void,
        error: (error: any) => void,
        warn: (info: any) => void
    }>
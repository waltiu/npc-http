import axios, { AxiosRequestConfig } from "axios";
import { errorLog, processUrl } from "./util";
import { CacheMapType, ConfigType, EnumAxiosType, EnumCache, JsonpMethodType, RequestConfigType, RequestMethodType } from "./type";
import { initInterceptors } from "./interceptors/index";
import { getCacheData } from "./interceptors/cacheInterceptor";

class request {
    config: ConfigType
    cache: CacheMapType
    axios: typeof axios
    constructor() {
        this.config = {
            cacheType: EnumCache.session
        }
        this.cache = {}
        this.axios = axios
        this.init()
    }
    init = (config?: ConfigType) => {
        initInterceptors(this.axios)
        this.config = {
            ...this.config,
            ...config || {}
        }
    }
    get = (key?: keyof ConfigType) => {
        return key ? this.config[key] : this.config
    }
    set = (key, value) => {
        this.config[key] = value
    }

    cacheMethod = () => {
        return this.config.cacheType === EnumCache.local ? localStorage : sessionStorage
    }

    sendRequest = async (method: EnumAxiosType, url: string, params?: any, config?: RequestConfigType) => {
        const cacheData = getCacheData({
            ...config,
            url
        })
        if (cacheData) {
            return cacheData
        }
        if (method === EnumAxiosType.postForm) {
            return this.axios[method](url, params, config as AxiosRequestConfig)
        }
        return this.axios({
            method,
            url: processUrl(url),
            [method === EnumAxiosType.get ? "params" : "data"]: params,
            ...this.config,
            ...config
        })

    }

    httpGet: RequestMethodType = (url, params, config) => {
        return new Promise((resolve, reject) => {
            this.sendRequest(
                EnumAxiosType.get,
                url,
                params,
                config
            ).then((res) => {
                resolve(res)
            }).catch(reject)
        })
    }
    httpPost: RequestMethodType = (url, params, config) => {
        return new Promise((resolve, reject) => {
            return this.sendRequest(
                EnumAxiosType.post,
                url,
                params,
                config
            ).then(resolve).catch(reject)
        })

    }
    postForm: RequestMethodType = (url, params, config) => {
        return new Promise((resolve, reject) => {
            return this.sendRequest(
                EnumAxiosType.postForm,
                url,
                params,
                config
            ).then(resolve).catch(reject)
        })
    }
    deleteCache = (key: string) => {
        if (key) {
            this.cacheMethod().removeItem(key)
        } else {
            this.cacheMethod().clear()
        }
    }
    jsonp: JsonpMethodType = async (url, options) => {
        // https://github.com/webmodules/jsonp
        const jsonp = (await import('jsonp')).default;
        return new Promise((resolve, reject) => {
            jsonp(
                url,
                {
                    ...(options || {}),
                },
                (err: Error | null, data: any) => {
                    if (err) {
                        errorLog(err)
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });

    }

    // fetch = () => {
    // }
}

const instance = new request()
export const httpInit = instance.init
export const httpConfigSet = instance.set
export const httpConfigGet = instance.get
export const httpPost = instance.httpPost
export const httpGet = instance.httpGet
export const postForm = instance.postForm
export const jsonp = instance.jsonp
// export const fetch = instance.fetch
export const deleteCache = instance.deleteCache

export default instance

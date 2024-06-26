import { RequestConfigType } from "npc-http/type";
import { Ref } from "vue";


export type HookOptions = {
    immediate?: boolean;
    onSuccess?: (res: any, params: any) => void;
    onError?: (res: any, params: any) => void;
}

export type RequestReturnType = {
    data: Ref<any>,
    error: Ref<any>,
    params: Ref<any>,
    loading: Ref<boolean>,
    run: (params?: any) => void,
    refresh: () => void
}

export type UseRequestType = (url: string, params?: any, method?: "get" | "post", hook?: HookOptions | null, config?: RequestConfigType) => RequestReturnType

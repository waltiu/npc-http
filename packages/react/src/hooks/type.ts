import { RequestConfigType } from "npc-http/type";


export type HookOptions = {
    immediate?: boolean;
    onSuccess?: (res: any, params: any) => void;
    onError?: (res: any, params: any) => void;
}

export type RequestReturnType={
    data: any,
    error: any,
    params:any,
    loading: boolean,
    run: (params?: any) => void,
    refresh:()=>void
}

export type UseRequestType = (url: string, params?: any, method?: "get" | "post", hook?: HookOptions|null, config?: RequestConfigType) => RequestReturnType

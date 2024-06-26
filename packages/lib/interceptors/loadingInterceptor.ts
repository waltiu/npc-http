import { GlobalConfigType } from "../type";

let requestCount = 0;

// 统计requestCount时的延迟时间，避免一个很快的请求也显示loading效果
const START_DELAY_TIME = 1500;
const END_DELAY_TIME = 250;

const changeRequestLoading = (watchRequestStatus:GlobalConfigType['watchRequestStatus']) => {
    if (watchRequestStatus && typeof watchRequestStatus === "function") {
        watchRequestStatus(requestCount > 0);
    }
};

export const startRequest = (config: any) => {
    // 此请求不使用loading
    if (config && config.ignoreLoading) {
        return;
    }
    requestCount += 1;
    // 请求开始一段时间后，如果还有未结束的请求
    setTimeout(() => {
        if (requestCount > 0) {
            changeRequestLoading(config.watchRequestStatus);
        }
    }, START_DELAY_TIME);
};

export const endRequest = (config: any) => {
    if (config) {
        // 此请求不使用loading
        if (config.ignoreLoading) {
            return;
        }
    }
    requestCount -= 1;

    // 请求结束一段时间后，如果还有未结束的请求
    setTimeout(() => {
        if (requestCount === 0) {
            changeRequestLoading(config.watchRequestStatus);
        }
    }, END_DELAY_TIME);
};

export const onRequestFulfilled = (config: any) => {
    startRequest(config);
    return config;
};

export const onRequestRejected = (error: any) => {
    return Promise.reject(error);
};

export const onResponseFulfilled = (response: any) => {
    endRequest(response && response.config);
    return response;
};

export const onResponseRejected = (error: any) => {
    endRequest(error && error.config);
    return Promise.reject(error);
};

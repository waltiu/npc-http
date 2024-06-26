
const ERROR_CODE = 500
const ERROR_PATH = "/login"


import * as resultInterceptor from './resultInterceptor';
export const onFulfilled = async (response: any) => {
    if (response?.config?.redirect) {
        try {
            await resultInterceptor.onFulfilled({
                ...response,
                config: {
                    ...response.config,
                    errorHandler: () => { }
                }
            })

        } catch (error) {
            const { code = ERROR_CODE, path = ERROR_PATH } = response.config.redirect
            if ((error as any)?.code === ERROR_CODE && path && code) {
                window.location.href = path
            }
        }
    }

    return response
};

export const onRejected = (res: any) => {
    return res
};



import instance from "..";
import { transferResult } from ".";
import { errorLog } from "../util";
import { ERROR_MESSAGE } from "../constant";

// 这里可以统一加工数据，返回
export const onFulfilled = (response: any) => {
  const transfer = response?.config?.transferResult || transferResult
  return transfer(response?.data || response?.response?.data || response, response.config);
};

// 对错误信息统一处理，建议和后端定好协议，错误直接返回错误信息，在这里统一message.error
export const onRejected = (res: any) => {
  if (res.response) {
    const message = instance.get('message')
    message && message.error(res?.response?.data?.message || ERROR_MESSAGE)
    errorLog(res.response)
  }
  return Promise.reject(res);
};


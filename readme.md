<p align="center">
  <a href="https://www.npmjs.com/package/npc-http">
    npc-http / use-request-r / use-request-v <br/>
     <a href="https://npmjs.com/package/npc-http"><img src="https://img.shields.io/npm/v/npc-http" alt="npm package"></a>
<a href="https://npmjs.com/package/use-request-r"><img src="https://img.shields.io/npm/v/use-request-r" alt="npm package"></a>
<a href="https://npmjs.com/package/use-request-v"><img src="https://img.shields.io/npm/v/use-request-v" alt="npm package"></a>
  </a>
<div></d
</p>


## 📚 Documentation

A high-quality & reliable request library，本项目采用monorepo架构，核心代码在`packages\lib`下面。

针对不同的使用场景，分别提供了不区分框架的js版本`npc-http`,vue hooks版本`use-request-v`, react hooks版本 `use-request-r`。

hooks版本相对于js版本进行了部分功能阉割，但是也满足大多数的需求了。

- [npc-http](https://github.com/waltiu/npc-http/tree/master/packages/lib)
- [use-request-r](https://github.com/waltiu/npc-http/tree/master/packages/react/src/hooks)
- [use-request-v](https://github.com/waltiu/npc-http/tree/master/packages/vue/src/hooks)

## 📦 Install

```bash
$ npm install --save npc-http
# or
$ yarn add npc-http
# or
$ pnpm add npc-http
# or
$ bun add npc-http
```

## ✨ Features

- 基于axios二次封装，提供配置读写方法：httpConfigSet，httpConfigGet
- 丰富的请内置方法：httpPost，httpGet，postForm，jsonp
- 一次配置全局可用，httpInit，初始化axios配置和npc-http配置
- 内置响应数据拦截器，默认取后端返回的data数据，也可以通过自定义transferResult处理返回数据
- 统一的错误拦截处理，当响应码不是200时，直接通过传入的message方法进行error提示
- 全局loading处理，监听请求状态
- 可选请求缓存，可对一些配置类请求进行缓存
- 登陆拦截器，自定义登陆错误状态码及重定向地址

## 🔨 Usage

```ts
import { httpGet, httpPost, jsonp, httpInit, postForm } from "npc-http";
const testGet = async () => {
  try {
    const result3 = await httpGet(
      "https://www.zhihu.com/api/v3/account/api/login/qrcode",
    );
    console.log(result3, "httpGet");
  } catch (error) {
    console.log(error, "httpGet");
  }
};

const testPost = async () => {
  const result1 = await httpPost(
    "https://httpbin.org/post",
    {
      a: 1,
      b: 2,
    },
    {
      ignoreTransferResult: true,

    }
  );
  console.log(result1, "httpPost");
};

const testJsonp = async () => {
  const result = await jsonp(`https://www.baidu.com/sugrec?prod=pc&wd=2222`);
  console.log(result, "jsonp");
};

const testForm = async () => {
  const result2 = await postForm(
    "https://httpbin.org/post",
    {
      my_field: "my value",
      my_buffer: new Blob([1, 2, 3]),
      my_file: [],
    },
    {
      transferResult: (data) => {
        return data.form;
      },
      cache: {
        cacheKey: "999",
        cacheTime: 20,
      },
    }
  );
  console.log(result2, "postForm");
};

const testRequest =  () => {
  testPost();
  testForm();
  testJsonp();
  testGet();

};
httpInit({
  message: {
    error: (text) => {
      alert(text);
    },
  },
  cacheType: "sessionStorage",
  watchRequestStatus: (status) => {
    // console.log(status, "status");
  },
});

testRequest();
 

```

更多配置配置：

npc-http配置：

```
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

```

axios配置：https://axios-http.com/zh/docs/req_config

## 💻 Code Demo

npc-http：

```
https://github.com/waltiu/npc-http/tree/master/packages/demo
```

use-request-v：

```
https://github.com/waltiu/npc-http/tree/master/packages/vue
```

use-request-r：

```
https://github.com/waltiu/npc-http/tree/master/packages/react
```

## 👥 ...

后续会继续迭代，大家也可以提需求!!!

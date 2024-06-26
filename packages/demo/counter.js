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
export function setupCounter(element) {
  element.addEventListener("click", () => {
    testRequest();
  });
}

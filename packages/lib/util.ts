export const processUrl = (url: string) => {
    if (url && !/^https?:\/\//i.test(url) && !url.startsWith("/")) {
      return `/${url}`;
    }
    return url;
  };


  export const isPromise=(obj:any)=>{
      return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
  }

  export const errorLog = (text: any) => {
    console.warn(
      `%c 错误信息 %c  ${typeof text === 'string' ? text : JSON.stringify(text)} %c`,
      "background:red ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
      "background:transparent"
    );
  }
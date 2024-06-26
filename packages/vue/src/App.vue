<script setup lang="ts">
import useRequest from "./hooks/index";
const { run, data, error, refresh, params } = useRequest(
  "https://httpbin.org/post",
  {
    a: 1,
    b: 2,
    "vue":"1"
  },
  "post",
  null,
  {
    ignoreTransferResult:true
  }
);
console.log(data, error);
</script>

<template>
  <div>
    <div :style="{ display: 'flex', flexDirection: 'column' }" id="666">
      <div>参数： {{ params }}</div>
      <div>结果： {{ data }}</div>
      <div>错误： {{ error }}</div>
      <button @click="run({ a: 9 })">查询</button>
      <div>------------</div>
      <button @click="refresh()">刷新</button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

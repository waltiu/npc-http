import './App.css'
import useRequest from './hooks'

function App() {
  const { run, data, error, refresh, params } = useRequest("https://httpbin.org/post", {
    a: 1,
    b: 2,
  }, "post",null,{
    ignoreTransferResult: true,
  })
  console.log(data, error)
  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column" }}>
        <div>
          参数：  {JSON.stringify(params)}
        </div>
        <div>
          结果：  {JSON.stringify(data)}
        </div>
        <div>
          错误：  {JSON.stringify(error)}
        </div>
        <button onClick={() => {
          run({
            10: 999
          })
        }}>
          查询
        </button>
        <div>------------</div>
        <button onClick={() => {
          refresh()
        }}>
          刷新
        </button>
      </div>
    </>
  )
}

export default App

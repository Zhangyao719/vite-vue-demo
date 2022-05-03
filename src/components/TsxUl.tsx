import Li from './TsxLi'
import { ref } from 'vue'

let data = ref<string>('')

const arr = [
  { label: '哈哈', value: 1 },
  { label: '嘿嘿', value: 2 },
  { label: '呵呵', value: 3 },
]
const getChildMsg = (msg: string) => {
  data.value = msg 
  console.log('接收到子组件数据', )
}
const clickTap = (ctx: any, payload: any) => {
  ctx.emit('onMsg', {value: payload, msg: data.value})
}
const renderDom = (props: any, ctx: any) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <ul>
        {arr.map(item => (
          <Li
            class="demo"
            data={item}
            style={{ listStyleType: 'none' }}
            getMsg={getChildMsg}
            onClick={clickTap.bind(this, ctx, item.value)}
          >
            { item.label }
          </Li>
        )) }
      </ul>
    </div>
  )
}
export default renderDom
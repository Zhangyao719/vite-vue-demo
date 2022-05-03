import Li from './TsxLi'

const arr = [
  { label: '哈哈', value: 1 },
  { label: '嘿嘿', value: 2 },
  { label: '呵呵', value: 3 },
]
const clickTap = (order: number) => {
    console.log('触发click' + order)
}
const getChildMsg = (msg: string) => {
  console.log('接收到子组件数据', msg)
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
            onClick={clickTap.bind(this, item.value)}
          >
            { item.label }
          </Li>
        )) }
      </ul>
    </div>
  )
}
export default renderDom
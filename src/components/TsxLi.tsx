import { ElMessage } from 'element-plus'

const handleClick = (props: any, msg: string) => {
  props.getMsg(msg)
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const renderDom = (props: any) => {
  return (
    <li className="demo" onClick={handleClick.bind(this, props, 'message')}>
      { props.data.label }
    </li>
  )
}
export default renderDom
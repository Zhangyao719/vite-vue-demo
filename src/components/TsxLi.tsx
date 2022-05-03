const handleClick = (props: any, msg: string) => {
  props.getMsg(msg)
}
const renderDom = (props: any) => {
  return (
    <li className="demo" onClick={handleClick.bind(this, props, 'message')}>
      { props.data.label }
    </li>
  )
}
export default renderDom
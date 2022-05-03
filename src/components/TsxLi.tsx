const renderDom = (props: any, ctx: any) => {
  console.log('🚀 →', props, ctx)
  const handleClick = (msg: string) => {
    props.getMsg(msg)
  }
  return (
    <li className="demo" onClick={handleClick.bind(this, 'message')}>
      { props.data.label }
    </li>
  )
}
export default renderDom
const renderDom = (props: any, ctx: any) => {
console.log('🚀 →', props, ctx)
  return (
    <li className="demo" >
    { props.data.label }
  </li>
  )
}
export default renderDom
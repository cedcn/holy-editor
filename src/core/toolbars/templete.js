import { element } from 'deku'

const Toolbars = {
  render: ({ props }) => {
    const { tools, __S_ } = props
    const viewer = tools.map(item => {
      return (
        <div id={__S_[`tool--${item.name}`]} class={`${__S_.tool} ${__S_[`tool--${item.name}`]}`} />
      )
    })

    return (
      <div class={__S_.toolbars}>{viewer}</div>
    )
  }
}
export default Toolbars

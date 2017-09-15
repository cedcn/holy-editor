import { element } from 'deku'

const Underline = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--underline']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default Underline

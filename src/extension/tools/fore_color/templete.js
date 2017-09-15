import { element } from 'deku'

const ForeColor = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--fore-color']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default ForeColor

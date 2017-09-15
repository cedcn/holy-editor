import { element } from 'deku'

const StrikeThrough = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--strike-through']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default StrikeThrough

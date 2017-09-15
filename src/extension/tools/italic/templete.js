import { element } from 'deku'

const Bold = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--italic']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default Bold

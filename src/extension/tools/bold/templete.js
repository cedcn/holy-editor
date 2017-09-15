import { element } from 'deku'

const Bold = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--bold']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default Bold

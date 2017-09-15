import { element } from 'deku'

const Modules = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--modules']}`}>
        <div id="menu-point" />
        <div id="modal-point" />
      </div>
    )
  }
}

export default Modules

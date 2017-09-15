import { element } from 'deku'

const Title = {
  render ({ props }) {
    const { __S_ } = props
    return (
      <div class={`${__S_.tool} ${__S_['tool--title']}`}>
        <div id="menu-point" data-type="widget" />
        <div id="modal-point" data-type="widget" />
      </div>
    )
  }
}

export default Title

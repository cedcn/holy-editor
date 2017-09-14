import { element } from 'deku'

const Modules = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--modules']}`}>
        <div id="menu-point" />
        <div id="modal-point" />
      </div>
    )
  }
}

export default Modules

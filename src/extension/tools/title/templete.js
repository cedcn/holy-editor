import { element } from 'deku'

const Title = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--title']}`}>
        <div id="menu-point" data-type="widget" />
        <div id="modal-point" data-type="widget" />
      </div>
    )
  }
}

export default Title

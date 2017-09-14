import { element } from 'deku'

const Underline = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--underline']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default Underline

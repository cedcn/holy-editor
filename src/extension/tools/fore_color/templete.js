import { element } from 'deku'

const ForeColor = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--fore-color']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default ForeColor

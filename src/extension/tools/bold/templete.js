import { element } from 'deku'

const Bold = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--bold']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default Bold

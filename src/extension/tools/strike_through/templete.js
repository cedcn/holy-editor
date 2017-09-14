import { element } from 'deku'

const StrikeThrough = {
  render ({ props }) {
    const { styles } = props
    return (
      <div class={`${styles.tool} ${styles['tool--strike-through']}`}>
        <div id="menu-point" />
      </div>
    )
  }
}

export default StrikeThrough

import { element } from 'deku'

const Menu = {
  render ({ props }) {
    const { icon, styles } = props
    const name = `icon-${icon}`

    return (
      <a class={styles.menu} href="javascript:;">
        <i class={`${styles.iconfont} ${styles[name]}`} />
      </a>
    )
  }
}
export default Menu

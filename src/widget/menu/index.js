import $ from 'jquery'
import { createApp, element } from 'deku'

import styles from '../../styles'

const defaults = {
  onMouseDown: () => {},
  menuChildren: null
}

class Menu {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const name = `icon-${this.options.icon}`

    const dom = (
      <a class={styles.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
        <i class={`${styles.iconfont} ${styles[name]}`} />
        {this.options.menuChildren}
      </a>
    )
    createApp($points.get(0))(dom)

    // $(points).on('click', this.options.click)
  }
}

export default Menu

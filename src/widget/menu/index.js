import $ from 'jquery'
import { createApp, element } from 'deku'

import styles from '../../styles'

const defaults = {
  click: () => {}
}

class Menu {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const name = `icon-${this.options.icon}`

    const dom = (
      <a class={styles.menu} href="javascript:;" onClick={this.options.click}>
        <i class={`${styles.iconfont} ${styles[name]}`} />
      </a>
    )
    createApp($points.get(0))(dom)

    // $(points).on('click', this.options.click)
  }
}

export default Menu

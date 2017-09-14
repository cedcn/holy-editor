import $ from 'jquery'
import { createApp, element } from 'deku'

import { clickAtOrigin } from '../../utils/common'
import styles from '../../styles'

const defaults = {
  click: () => {}
}

class DropDownMenu {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const name = `icon-${this.options.icon}`

    const dom = (
      <div>
        <div>
          <a class={styles.menu} href="javascript:;" onClick={this.options.click}>
            <i class={`${styles.iconfont} ${styles[name]}`} />
          </a>
          <div class={styles['drop-down-container']}>
            <a class={styles.menu} href="javascript:;" onClick={this.togglePanel}>
              <i class={`${styles.iconfont} ${styles['icon-triangle']}`} />
            </a>
            <div class={styles['drop-down-panel']}>
            </div>
          </div>
        </div>

      </div>
    )
    createApp($points.get(0))(dom)

    const $container = $points.find(styles['drop-down-container'].selector)
    this.$container = $container
  }

  togglePanel = e => {
    this.$container.toggleClass(styles['is-active'].className)
    clickAtOrigin(this.$container, () => this.$container.removeClass(styles['is-active'].className))
  }
}

export default DropDownMenu

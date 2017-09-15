import $ from 'jquery'
import { createApp, element } from 'deku'

import { clickAtOrigin } from '../../utils/common'
import styles from '../../styles'

const defaults = {
  onMouseDown: () => {},
  menuChildren: null,
  panelChildren: null
}

class DropDownMenu {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const name = `icon-${this.options.icon}`

    const dom = (
      <div>
        <div>
          <a class={styles.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
            <i class={`${styles.iconfont} ${styles[name]}`} />
            {this.options.menuChildren}
          </a>
          <div class={styles['drop-down-container']}>
            <a class={styles.menu} href="javascript:;" onMouseDown={e => {
              e.preventDefault()
              this.togglePanel(e)
            }}>
              <i class={`${styles.iconfont} ${styles['icon-triangle']}`} />
            </a>
            <div class={styles['drop-down-panel']} onMouseDown={e => e.preventDefault()}>
              {this.options.panelChildren}
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

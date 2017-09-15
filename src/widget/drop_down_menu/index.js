import $ from 'jquery'
import { createApp, element } from 'deku'

import { clickAtOrigin } from 'utils/common'

const defaults = {
  onMouseDown: () => {},
  menuChildren: '',
  panelChildren: ''
}

class DropDownMenu {
  constructor (point, options) {
    const $point = $(point)
    this.options = Object.assign({}, defaults, options)
    const iconName = `icon-${this.options.icon}`

    const { __S_ } = this.constructor

    const dom = (
      <div>
        <div>
          <a class={__S_.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
            <i class={`${__S_.iconfont} ${__S_[iconName]}`} />
            {this.options.menuChildren}
          </a>
          <div class={__S_['drop-down-container']}>
            <a class={__S_.menu} href="javascript:;" onMouseDown={e => {
              e.preventDefault()
              this.togglePanel(e)
            }}>
              <i class={`${__S_.iconfont} ${__S_['icon-triangle']}`} />
            </a>
            <div class={__S_['drop-down-panel']} onMouseDown={e => e.preventDefault()}>
              {this.options.panelChildren}
            </div>
          </div>
        </div>
      </div>
    )

    createApp($point.get(0))(dom)

    const $container = $point.find(__S_['drop-down-container'].selector)
    this.$container = $container
  }

  togglePanel = e => {
    const { __S_ } = this.constructor
    this.$container.toggleClass(__S_['is-active'].className)
    clickAtOrigin(this.$container, () => this.$container.removeClass(__S_['is-active'].className))
  }
}

export default DropDownMenu

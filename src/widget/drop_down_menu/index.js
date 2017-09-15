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
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <div>
        <div>
          <a class={this.__S_.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
            <i class={`${this.__S_.iconfont} ${this.__S_[iconName]}`} />
            {this.options.menuChildren}
          </a>
          <div class={this.__S_['drop-down-container']}>
            <a class={this.__S_.menu} href="javascript:;" onMouseDown={e => {
              e.preventDefault()
              this.togglePanel(e)
            }}>
              <i class={`${this.__S_.iconfont} ${this.__S_['icon-triangle']}`} />
            </a>
            <div class={this.__S_['drop-down-panel']} onMouseDown={e => e.preventDefault()}>
              {this.options.panelChildren}
            </div>
          </div>
        </div>
      </div>
    )

    createApp($point.get(0))(dom)

    const $container = $point.find(this.__S_['drop-down-container'].selector)
    this.$container = $container
  }

  togglePanel = e => {
    this.$container.toggleClass(this.__S_['is-active'].className)
    clickAtOrigin(this.$container, () => this.$container.removeClass(this.__S_['is-active'].className))
  }
}

export default DropDownMenu

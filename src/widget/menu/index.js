import $ from 'jquery'
import { createApp, element } from 'deku'

const defaults = {
  onMouseDown: () => {},
  menuChildren: ''
}

class Menu {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const name = `icon-${this.options.icon}`
    const { __S_ } = this.constructor

    const dom = (
      <a class={__S_.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
        <i class={`${__S_.iconfont} ${__S_[name]}`} />
        {this.options.menuChildren}
      </a>
    )
    createApp($points.get(0))(dom)

    // $(points).on('click', this.options.click)
  }
}

export default Menu

import $ from 'jquery'
import { createApp, element } from 'deku'

const defaults = {
  onMouseDown: () => {},
  menuChildren: ''
}

class Menu {
  constructor (point, options) {
    const $point = $(point)
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <a class={this.__S_.menu} href="javascript:;" onMouseDown={this.options.onMouseDown}>
        <i class={`${this.__S_.iconfont} ${this.__S_[iconName]}`} />
        {this.options.menuChildren}
      </a>
    )
    createApp($point.get(0))(dom)

    // $(point).on('click', this.options.click)
  }
}

export default Menu

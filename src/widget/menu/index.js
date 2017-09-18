import $ from 'jquery'
import { createApp, element } from 'deku'

const defaults = {
  onMouseDown: () => {},
  menuChildren: ''
}

class Menu {
  constructor (point, options) {
    this.$point = $(point)
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <a class={this.__S_['menu']} href="javascript:;">
        <i class={`${this.__S_.iconfont} ${this.__S_[iconName]}`} />
        {this.options.menuChildren}
      </a>
    )
    createApp(this.$point.get(0))(dom)

    this.$menu = this.$point.find(this.__S_['menu'].selector)

    this.$menu.on('mousedown', this.options.onMouseDown)
  }
}

export default Menu

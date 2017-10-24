import { mount, addTooltip } from 'utils/common'

const defaults = {
  icon: '',
  tooltip: '',
  onMouseDown: () => {}
}

class Menu {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <a class={this.__S_['menu']} href="javascript:;" data-widget="menu">
        <i class={`${this.__S_.iconfont} ${this.__S_[iconName]}`} />
      </a>
    )
    this.$container = mount($selector, dom)

    if (this.options.tooltip.length > 0) {
      addTooltip(this.$container, this.__S_, this.options.tooltip)
    }

    this.$container.on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-disabled'].className)) {
        this.options.onMouseDown(e)
      }
    })
  }

  disable = () => {
    this.$container.addClass(this.__S_['is-disabled'].className)
  }

  enable = () => {
    this.$container.removeClass(this.__S_['is-disabled'].className)
  }

  turnOn = () => {
    this.$container.addClass(this.__S_['is-light'].className)
  }

  turnOff = () => {
    this.$container.removeClass(this.__S_['is-light'].className)
  }
}

export default Menu

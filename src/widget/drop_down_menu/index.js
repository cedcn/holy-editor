import { clickAtOrigin, mount } from 'utils/common'

const defaults = {
  onMouseDown: () => {},
  menuChildren: '',
  panelChildren: ''
}

class DropDownMenu {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const iconName = `icon-${this.options.icon}`

    const dom = (
      <div class={this.__S_['drop-down-menu']} data-widget="drop-down-menu">
        <a class={this.__S_['drop-menu']} href="javascript:;">
          <i class={`${this.__S_.iconfont} ${this.__S_[iconName]}`} />
          {this.options.menuChildren}
        </a>
        <div class={this.__S_['drop-down-container']}>
          <a class={this.__S_['drop-triangle']} href="javascript:;">
            <i class={`${this.__S_.iconfont} ${this.__S_['icon-triangle']}`} />
          </a>
          <div class={this.__S_['drop-down-panel']} onMouseDown={e => e.preventDefault()}>
            {this.options.panelChildren}
          </div>
        </div>
      </div>
    )

    this.$container = mount($selector, dom)
    this.$menu = this.$container.find(this.__S_['drop-menu'].selector)
    this.$panel = this.$container.find(this.__S_['drop-down-container'].selector)

    this.$menu.on('mousedown', this.options.onMouseDown)

    this.$container.find(this.__S_['drop-triangle'].selector).on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-available'].className)) {
        this.togglePanel(e)
      }
    })

    clickAtOrigin(this.$panel, () => this.$panel.removeClass(this.__S_['is-active'].className))
  }

  togglePanel = e => {
    this.$panel.toggleClass(this.__S_['is-active'].className)
  }

  openPanel = () => {
    this.$panel.addClass(this.__S_['is-active'].className)
  }

  closePanel = () => {
    this.$panel.removeClass(this.__S_['is-active'].className)
  }

  disable = () => {
    this.$container.addClass(this.__S_['is-available'].className)
  }

  enable = () => {
    this.$container.removeClass(this.__S_['is-available'].className)
  }
}

export default DropDownMenu

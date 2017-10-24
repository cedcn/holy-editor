import find from 'lodash/find'

import { clickAtOrigin, mount, addTooltip } from 'utils/common'

const defaults = {
  icon: '',
  tooltip: '',
  onSelect: () => {},
  options: [],
  checked: { label: '', value: '' }
}

class SelectMenu {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const labels = this.options.options.map(item => {
      return (
        <a class={this.__S_['select-menu__label']} href="javascript:;" data-value={item.value} >{item.label}</a>
      )
    })

    let checked = find(this.options.options, this.options.checked)

    if (typeof checked === 'undefined') {
      checked = this.options.options[0]
    }

    const dom = (
      <div class={this.__S_['select-menu']} data-widget="select-menu">
        <a class={this.__S_['select-menu__checked']} href="javascript:;">
          <span class={this.__S_['select-menu__checked-label']}>{checked.label}</span>
          <i class={`${this.__S_.iconfont} ${this.__S_['icon-triangle']}`} />
        </a>
        <div class={this.__S_['select-menu__list']} onMouseDown={e => e.preventDefault()}>
          {labels}
        </div>
      </div>
    )

    this.$container = mount($selector, dom)
    this.$checked = this.$container.find(this.__S_['select-menu__checked'].selector)
    this.$list = this.$container.find(this.__S_['select-menu__list'].selector)
    this.$label = this.$container.find(this.__S_['select-menu__label'].selector)
    this.$checkedLabel = this.$container.find(this.__S_['select-menu__checked-label'].selector)

    if (this.options.tooltip.length > 0) {
      addTooltip(this.$checked, this.__S_, this.options.tooltip)
    }

    this.$checked.on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-disabled'].className)) {
        this.togglePanel()
      }
    })

    this.$label.on('mousedown', e => {
      e.preventDefault()
      const label = $(e.target).text()
      const value = $(e.target).data('value')
      this.$checkedLabel.text(label)
      this.closePanel()
      this.options.onSelect({ value, label })
    })

    this.closePanel()
    clickAtOrigin(this.$container, () => this.closePanel())
  }

  togglePanel = () => {
    if (this.$container.hasClass(this.__S_['is-active'].className)) {
      this.closePanel()
    } else {
      this.openPanel()
    }
  }

  setChecked = checked => {
    this.$checkedLabel.text(checked.label)
    this.$checkedLabel.data('data', checked.value)
  }

  openPanel = () => {
    this.$list.css('display', 'block')
    this.$container.addClass(this.__S_['is-active'].className)
  }

  closePanel = () => {
    this.$list.css('display', 'none')
    this.$container.removeClass(this.__S_['is-active'].className)
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

export default SelectMenu

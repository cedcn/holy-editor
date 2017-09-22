import $ from 'jquery'
import { element } from 'deku'
import find from 'lodash/find'

import { clickAtOrigin, mount } from 'utils/common'

const defaults = {
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
        <a class={this.__S_['select-label']} href="javascript:;" data-value={item.value} >{item.label}</a>
      )
    })

    let checked = find(this.options.options, this.options.checked)

    if (typeof checked === 'undefined') {
      checked = this.options.options[0]
    }

    const dom = (
      <div class={this.__S_['select-menu']} data-widget="select-menu">
        <a class={this.__S_['select-checked']} href="javascript:;">
          <span class={this.__S_['select-checked-label']}>{checked.label}</span>
          <i class={`${this.__S_.iconfont} ${this.__S_['icon-triangle']}`} />
        </a>
        <div class={this.__S_['select-list']} onMouseDown={e => e.preventDefault()}>
          {labels}
        </div>
      </div>
    )

    this.$container = mount($selector, dom)

    this.$container.find(this.__S_['select-checked'].selector).on('mousedown', e => {
      e.preventDefault()
      if (!this.$container.hasClass(this.__S_['is-disabled'].className)) {
        this.togglePanel()
      }
    })

    this.$container.find(this.__S_['select-label'].selector).on('mousedown', e => {
      e.preventDefault()
      const label = $(e.target).text()
      const value = $(e.target).data('value')
      this.$container.find(this.__S_['select-checked-label'].selector).text(label)
      this.closePanel()
      this.options.onSelect({ value, label })
    })

    clickAtOrigin(this.$container, () => this.$container.removeClass(this.__S_['is-active'].className))
  }

  togglePanel = () => {
    this.$container.toggleClass(this.__S_['is-active'].className)
  }

  setChecked = checked => {
    this.$container.find(this.__S_['select-checked-label'].selector).text(checked.label)
    this.$container.find(this.__S_['select-checked-label'].selector).data('data', checked.value)
  }

  openPanel = () => {
    this.$container.addClass(this.__S_['is-active'].className)
  }

  closePanel = () => {
    this.$container.removeClass(this.__S_['is-active'].className)
  }

  disable = () => {
    this.$container.addClass(this.__S_['is-disabled'].className)
  }

  enable = () => {
    this.$container.removeClass(this.__S_['is-disabled'].className)
  }
}

export default SelectMenu

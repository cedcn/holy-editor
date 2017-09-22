import { mount } from 'utils/common'
import { element } from 'deku'

const defaults = {
  panel: ''
}

class Popover {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const dom = (
      <div class={this.__S_['popover']} data-widget="popover" onMouseDown={e => e.preventDefault()}>
        {this.options.panel}
      </div>
    )

    this.$container = mount($selector, dom)
  }

  togglePanel = e => {
    this.$container.toggleClass(this.__S_['is-active'].className)
  }

  openPanel = () => {
    this.$container.addClass(this.__S_['is-active'].className)
  }

  closePanel = () => {
    this.$container.removeClass(this.__S_['is-active'].className)
  }
}

export default Popover

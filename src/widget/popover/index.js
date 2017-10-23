import { mount, clickAtOrigin } from 'utils/common'

const defaults = {
  panel: '',
  onMount: () => {}
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
    this.options.onMount.call(this)

    clickAtOrigin($selector, () => this.close())
  }

  toggle = e => {
    if (this.$container.hasClass(this.__S_['is-active'].className)) {
      this.close()
    } else {
      this.open()
    }
  }

  open = () => {
    this.$container.addClass(this.__S_['is-active'].className)
  }

  close = () => {
    this.$container.removeClass(this.__S_['is-active'].className)
  }
}

export default Popover

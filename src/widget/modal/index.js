import $ from 'jquery'
import { mount } from 'utils/common'
import { element } from 'deku'

const $body = $('html body')

const defaults = {
  click: () => {}
}

class Modal {
  constructor ($selector, options) {
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const dom = (
      <section class={this.__S_['modal-container']} data-widget="modal">
        <div class={this.__S_['modal-content']}>
          {this.options.panel}
          <div class={this.__S_['modal-close']} />
        </div>
        <div class={this.__S_['modal-mask']} />
      </section>
    )

    this.$container = mount($selector, dom)

    const $closeBtn = this.$container.find(this.__S_['modal-close'].selector)
    const $mask = this.$container.find(this.__S_['modal-mask'].selector)

    let isOpen = false

    this.$container.on('mousedown', e => {
      e.preventDefault()
    })

    this.open = () => {
      if (isOpen) return
      isOpen = true

      this.$container.css('display', 'block')
      $body.addClass(this.__S_['open-modal'].className)

      $(document).on('keydown', this.escCloseModal)

      const openAnima = setTimeout(() => {
        this.$container.addClass(this.__S_['modal-show'].className)
        clearTimeout(openAnima)
      }, 10)
    }

    this.close = () => {
      if (!isOpen) return
      isOpen = false
      this.$container.removeClass(this.__S_['modal-show'].className)
      $body.removeClass(this.__S_['open-modal'].className)
      $(document).off('keydown', this.escCloseModal)

      const closeAnima = setTimeout(() => {
        this.$container.css('display', 'none')
        clearTimeout(closeAnima)
      }, 300)
    }

    $mask.on('mousedown', e => {
      if (e.which === 1) this.close()
    })

    $closeBtn.on('click', () => {
      this.close()
    })
  }

  escCloseModal = e => {
    if (e.which === 27) this.close()
  }
}

export default Modal

import $ from 'jquery'
import { createApp, element } from 'deku'

const $body = $('html body')

const defaults = {
  click: () => {}
}

class Modal {
  constructor (point, options) {
    this.$point = $(point)
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const dom = (
      <section class={this.__S_['modal-container']}>
        <div class={this.__S_['modal-content']}>
          {this.options.panel}
          <div class={this.__S_['modal-close']} />
        </div>
        <div class={this.__S_['modal-mask']} />
      </section>
    )

    createApp(this.$point.get(0))(dom)

    const $container = this.$point.find(this.__S_['modal-container'].selector)

    const $closeBtn = $container.find(this.__S_['modal-close'].selector)
    const $mask = $container.find(this.__S_['modal-mask'].selector)

    let isOpen = false

    $container.on('mousedown', e => {
      e.preventDefault()
    })

    this.open = () => {
      if (isOpen) return
      isOpen = true

      $container.css('display', 'block')
      $body.addClass(this.__S_['open-modal'].className)

      $(document).on('keydown', this.escCloseModal)

      const openAnima = setTimeout(() => {
        $container.addClass(this.__S_['modal-show'].className)
        clearTimeout(openAnima)
      }, 10)
    }

    this.close = () => {
      if (!isOpen) return
      isOpen = false
      $container.removeClass(this.__S_['modal-show'].className)
      $body.removeClass(this.__S_['open-modal'].className)
      $(document).off('keydown', this.escCloseModal)

      const closeAnima = setTimeout(() => {
        $container.css('display', 'none')
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

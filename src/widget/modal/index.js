import $ from 'jquery'
import { createApp, element } from 'deku'

const $body = $('html body')

const defaults = {
  click: () => {}
}

class Modal {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)
    const { __S_ } = this.constructor

    const dom = (
      <section class={__S_['modal-container']}>
        <div class={__S_['modal-content']}>
          <div class={__S_['modal-close']} />
        </div>
        <div class={__S_['modal-mask']} />
      </section>
    )
    createApp($points.get(0))(dom)

    const $container = $points.find(__S_['modal-container'].selector)

    const $closeBtn = $container.find(__S_['modal-close'].selector)
    const $mask = $container.find(__S_['modal-mask'].selector)

    let isOpen = false

    this.open = () => {
      if (isOpen) return
      isOpen = true

      $container.css('display', 'block')
      $body.addClass(__S_['open-modal'].className)

      $(document).on('keydown', this.escCloseModal)

      const openAnima = setTimeout(() => {
        $container.addClass(__S_['modal-show'].className)
        clearTimeout(openAnima)
      }, 10)
    }

    this.close = () => {
      if (!isOpen) return
      isOpen = false
      $container.removeClass(__S_['modal-show'].className)
      $body.removeClass(__S_['open-modal'].className)
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

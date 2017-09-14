import $ from 'jquery'
import { createApp, element } from 'deku'

import styles from '../../styles'

const $body = $('html body')

const defaults = {
  click: () => {}
}

class Modal {
  constructor (points, options) {
    const $points = $(points)
    this.options = Object.assign({}, defaults, options)

    const dom = (
      <section class={styles['modal-container']}>
        <div class={styles['modal-content']}>
          <div class={styles['modal-close']} />
        </div>
        <div class={styles['modal-mask']} />
      </section>
    )
    createApp($points.get(0))(dom)

    const $container = $points.find(styles['modal-container'].selector)

    const $closeBtn = $container.find(styles['modal-close'].selector)
    const $mask = $container.find(styles['modal-mask'].selector)

    let isOpen = false

    this.open = () => {
      if (isOpen) return
      isOpen = true

      $container.css('display', 'block')
      $body.addClass(styles['open-modal'].className)

      $(document).on('keydown', this.escCloseModal)

      const openAnima = setTimeout(() => {
        $container.addClass(styles['modal-show'].className)
        clearTimeout(openAnima)
      }, 10)
    }

    this.close = () => {
      if (!isOpen) return
      isOpen = false
      $container.removeClass(styles['modal-show'].className)
      $body.removeClass(styles['open-modal'].className)
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

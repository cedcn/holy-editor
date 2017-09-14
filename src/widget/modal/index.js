import $ from 'jquery'
import Modal from './templete'
import styles from '../../styles'

const $body = $('html body')

console.log(styles)

class Widget {
  constructor (selector) {
    const $selector = $(selector).first()

    // add wrap and close button
    $selector.addClass(styles['modal-content'].className)
    $selector.wrap(`<section class="${styles['modal-container']}"></section>`)
    $selector.append(`<div class="${styles['modal-close']}"/>`)

    const $container = $selector.parent(styles['modal-container'].selector)
    $container.append(`<div class="${styles['modal-mask']}" />`)

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

const modal = {
  Tpl: Modal,
  constructor: Widget
}

export default modal

import $ from 'jquery'
import Modal from './templete'

class Widget {
  constructor (selector) {
    this.$selector = $(selector).first()
  }

  open = () => {}

  close = () => {}
}

const modal = {
  Tpl: Modal,
  constructor: Widget
}

export default modal
